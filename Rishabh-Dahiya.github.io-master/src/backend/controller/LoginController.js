const db = require("../database/conn");
const session = require("express-session");
const { updateOne } = require("../database/userschema");

module.exports = {
  login: login,
  changepassword: changepassword,
  checkuserid: checkuserid,
};

function login(req, res) {
  const { email, password } = req.body;
  if (!(email && password))
    return res.render("login", {
      err: "Please enter all the required details",
    });
  else {
    db.collection("users").findOne(
      { email: email, password: password },
      "*",
      function (err, result) {
        if (err) {
          console.log(err);
          throw err;
        } else {
          if (result) {
            if(result.isdoctor){
              req.flash("success", "user found");
              console.log("user present in checkuserid");
              req.session.name = result.name;
              req.session.email = result.email,
                req.session.password = result.password,
                req.session.gender = result.gender,
                req.session.dateofbirth = result.dateofbirth,
                req.session.isdoctor = result.isdoctor,
                req.session.state = result.state,
                req.session.number = result.number,
                req.session.city = result.city,
                req.session.country = result.country;
                req.session.description = result.description;
                req.session.hospital = result.hospital;
                req.session.achievement = result.achievement;
                req.session.treatment = result.treatment;
                req.session.experience = result.experience;
                req.session.qualification = result.qualification;
                req.session.awards = result.awards;
                req.session.specialization = result.specialization;
                req.session.fees = result.fees;
                console.log("user successfully logged in ");
                req.flash("success", "Login Successful ");
                return res.render("index",{
                  username: result.name,
                  number: result.number,
                  email: result.email,
                  gender: result.gender,
                  dateofbirth: result.dateofbirth,
                  city: result.city,
                  state: result.state,
                  isdoctor: result.isdoctor,
                  country: result.country,
                  description :result.description,
                  hospital:result.hospital,
                  achievement:result.achievement,
                  experience:result.experience,
                  qualification:result.qualification,
                  awards:result.awards,
                  specialization:result.specialization,
                  fees:result.fees,  
                  treatment : result.treatment
                })
            } 
            else{
              console.log("user successfully logged in ");
              req.flash("success", "Login Successful ");
              req.session.email = result.email;
              req.session.name = result.name;
              req.session.password = result.password;
              req.session.gender = result.gender;
              req.session.dateofbirth = result.dateofbirth;
              req.session.city = result.city;
              req.session.state = result.state;
              req.session.country = result.country;
              req.session.number = result.number;
              req.session.isdoctor = result.isdoctor;
              return res.render("index", {
                messages: req.flash(),
                username: result.name,
                number: result.number,
                pfp: "https://image.shutterstock.com/image-vector/user-avatar-icon-button-profile-260nw-1517550290.jpg",
              });
            }
          } else {
            req.flash("error", "Incorrect email or password");
            res.render("login", {
              messages: req.flash(),
            });
            console.log("Incorrect email or password");
          }
        }
      }
    );
  }
}

function checkuserid(req, res) {
  const authuser = req.body.userid;
  console.log("checking if it's catching user or not " + authuser);
  db.collection("users").findOne({ email: authuser }, function (err, result) {
    if (err) {
      console.log(err);
      throw err;
    } else {
      if (result) {
        req.flash("success", "user found");
        console.log("user present in checkuserid");
        req.session.email = result.email;
        req.session.name = result.name;
        req.session.number = result.number;
        console.log("this is number session " + req.session.number);
        return res.render("otp-password", {
          messages: req.flash(),
        });
      }
      else {
        req.flash("error", "user not present");
        console.log("user not found");
        res.render("password-user", { messages: req.flash() });
      }
    }
  });
}

function changepassword(req, res) {
  const newp = req.body.newpassp;
  console.log("this is entered newpassword " + newp);
  const checkp = req.body.confirmpassp;
  console.log("this is entered confirm password " + checkp);

  if (newp === checkp) {
    const number = req.session.number;
    console.log("this is session " + req.session.number);
    console.log("this is if email " + number);
    const query = { number: req.session.number };
    const newValues = { $set: { password: newp } };
    db.collection("users").updateOne(query, newValues, function (err, result) {
      if (err) {
        console.log(err);
        throw err;
      } else {
        req.flash("success", "password changed successfully");
        res.render("login.ejs", {
          messgaes: req.flash(),
        });
      }
    });
  } else {
    req.flash("warning", "password not matching");
    console.log("password not matching");
    res.render("otp-password", {
      messages: req.flash(),
    });
  }
}
