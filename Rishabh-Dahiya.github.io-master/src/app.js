const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const messages = require("express-messages");
const flash = require("connect-flash");
const db = require("./backend/database/conn");
const router = express.Router();
const app = express();
const port = process.env.PORT || 5000;
const user = require("./backend/database/userschema");
const OtpManager = require("./OtpManager");
const otpRepository = require("./otpRepository");
const otpSender = require("./otpSender");

/*--------------------app use ---------------------------------------------------*/
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//for otp service

// For session
app.use(
  session({
    secret: "TvastraProject_session/id",
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
      mongoUrl: "mongodb://localhost:27017",
    }),
    cookie: {
      path: "/",
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use(flash());
// global variables. Creating our own middleware. Custom middleware coming from flash
app.use(require("connect-flash")());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

/*-------------------connection to controller and routes-------------------------*/
const Signupdetails = require("./backend/database/userschema");
const mainRoutes = require("./backend/routes/MainRoutes");
require("../src/backend/database/conn");

/*------------------------Setting it to public-------------------*/
app.set("views", __dirname + "/client/views");

app.use("/img", express.static(path.join(__dirname, "client/images")));
app.use("/css", express.static(path.join(__dirname, "client/css")));
app.use("/js", express.static(path.join(__dirname, "client/scripts")));
app.use("/font", express.static(path.join(__dirname, "client/fonts")));

const otpManager = new OtpManager(otpRepository, {
  otpLength: 4,
  validityTime: 4,
});
app.post("/otp/:token", async (req, res) => {
  const { number } = req.body.phonenum;
  console.log(number + "this the number got from req.body");
  var k = await user.findOne({ phonenum: number });

  db.collection("users")
    .findOne({ phonenum: number })
    .then((user) => {
      if (user) {
        const otp = otpManager.create(req.params.token);
        req.body.recieverNumber = "917015388780";
        console.log("Otp sent");
        console.log(req.body);
        req.session.name = user.name;
        (req.session.email = user.email),
          (req.session.password = user.password),
          (req.session.gender = user.gender),
          (req.session.dateofbirth = user.dateofbirth),
          (req.session.state = user.state),
          (req.session.number = user.number),
          (req.session.city = user.city),
          (req.session.country = user.country);
        otpSender.send(otp, req.body);
        console.log("this is the req.body");
        console.log(`Your token code is ${otp.token} and otp is ${otp.code}`);
        req.flash("success", "Otp sent");
        res.render("otp.ejs", {
          messages: req.flash(),
        });
      } else {
        console.log("directly going to else");
        req.flash("warning", "user not present");
        return res.render("signup", {
          messages: req.flash(),
        });
      }
    });
});

//Verify Otp

app.post("/verifyotp/:token", (req, res) => {
  var code =
    req.body.digit1 + req.body.digit2 + req.body.digit3 + req.body.digit4;
  console.log(code);

  const verificationResults = otpManager.VerificationResults;
  const verificationResult = otpManager.verify(req.params.token, code);
  let statusCode;
  let bodyMessage;

  switch (verificationResult) {
    case verificationResults.valid:
      req.flash("success", "Welcome Login Successfull");
      console.log("this user.number " + req.session.number);
      console.log("inside switch " + req.session.name);
      return res.redirect("/index.ejs", {
        messages: req.flash(),
        username: req.session.name,
        number: req.session.number,
      });
      break;
    case verificationResults.notValid:
      req.flash("error", "Incorrect Otp");

      return res.render("otp", {
        messages: req.flash(),
      });
      break;
    case verificationResults.checked:
      req.flash("warning", "Code already used");

      return res.render("otp", {
        messages: req.flash(),
      });
      break;
    case verificationResults.expired:
      req.flash("error", "Otp expired");
      return res.render("otp", {
        messages: req.flash(),
      });
      break;
    default:
      req.flash("error", "Otp not delivered");
      return res.render("phonelogin", {
        messages: req.flash(),
      });
  }
  res.status(statusCode).send(bodyMessage);
});

// For routing
app.use("/", mainRoutes);

//for logging purposes
app.use(logger("dev"));

//setting view engine as ejs
app.set("view engine", "ejs");

//for rendering ejs in html format.
app.engine("html", require("ejs").renderFile);

app.listen(port, () => {
  console.log(`Server is running at port number, ${port}`);
});
