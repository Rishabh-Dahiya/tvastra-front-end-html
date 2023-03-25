function signup(req, res) {
  if (!req.session.email) {
    res.render("signup");
  } else {
    req.flash("error", "Please logout first");
    res.render("index", {
      messages: req.flash(),
      username: res.name,
    });
  }
}

function doctor_signup(req, res) {
  res.render("doctor-signup", {
    username: req.session.name,
    number: req.session.number,
  });
}
function login(req, res) {
  if (!req.session.email) {
    res.render("login");
  } else {
    req.flash("error", "Please logout first");
    res.render("index", {
      messages: req.flash(),
      username: req.session.name,
      number: req.session.number,
    });
  }
}
function logout(req, res) {
  req.session.destroy();
  console.log("session destroyed");
  res.render("login");
}
function healthy(req, res) {
  res.render("healthy", {
    username: req.session.name,
    number: req.session.number,
  });
}

function about_hospital(req, res) {
  res.render("about-hospital", {
    username: req.session.name,
    number: req.session.number,
  });
}
function index(req, res) {
  console.log(req.session);

  res.render("index");
}

function doctor(req, res) {
  res.render("doctor", {
    username: req.session.name,
    number: req.session.number,
  });
}
function appointment(req, res) {
  res.render("appointment", {
    username: req.session.name,
    number: req.session.number,
  });
}
function myappointments(req, res) {
  console.log("this is req.session.appointdate" + req.session.appointdate);
  res.render("myappointments", {
    username: req.session.name,
    number: req.session.number,
    email: req.session.email,
    gender: req.session.gender,
    dateofbirth: req.session.dateofbirth,
    appointdate: req.session.appointdate,
    instance: req.session.instance,
    status: req.session.status,
    appointdetails: req.session.appointdetails,
  });
}

function contactus(req, res) {
  res.render("contactus", {
    username: req.session.name,
    number: req.session.number,
  });
}

function about_doctor(req, res) {
  res.render("about-doctor", {
    username: req.session.name,
    number: req.session.number,
  });
}

function faq(req, res) {
  res.render("faq", {
    username: req.session.name,
    number: req.session.number,
  });
}
function hospital(req, res) {
  res.render("hospital", {
    username: req.session.name,
    number: req.session.number,
  });
}
function query(req, res) {
  res.render("query", {
    username: req.session.name,
    number: req.session.number,
  });
}
function treatment(req, res) {
  res.render("treatment", {
    username: req.session.name,
    number: req.session.number,
  });
}
function tvastra_plus(req, res) {
  res.render("tvastra-plus", {
    username: req.session.name,
    number: req.session.number,
  });
}
function otp(req, res) {
  res.render("otp");
}
function otp_password(req, res) {
  res.render("otp-password");
}
function password_user(req, res) {
  res.render("password-user");
}
function phonelogin(req, res) {
  res.render("phonelogin");
}
function dashboard(req, res) {
  res.render("dashboard", {
    username: req.session.name,
    number: req.session.number,
    email: req.session.email,
    gender: req.session.gender,
    dateofbirth: req.session.dateofbirth,
    city: req.session.city,
    state: req.session.state,
    isdoctor: req.session.isdoctor,
    country: req.session.country,
    description: req.session.description,
    hospital: req.session.hospital,
    achievement: req.session.achievement,
    experience: req.session.experience,
    qualification: req.session.qualification,
    awards: req.session.awards,
    specialization: req.session.specialization,
    fees: req.session.fees,
    treatment: req.session.treatment,
  });
}

module.exports = {
  login: login,
  signup: signup,
  index: index,
  tvastra_plus: tvastra_plus,
  about_hospital: about_hospital,
  about_doctor: about_doctor,
  faq: faq,
  hospital: hospital,
  doctor: doctor,
  treatment: treatment,
  query: query,
  healthy: healthy,
  contactus: contactus,
  appointment: appointment,
  otp: otp,
  otp_password: otp_password,
  phonelogin: phonelogin,
  logout: logout,
  password_user: password_user,
  doctor_signup: doctor_signup,
  dashboard: dashboard,
  myappointments: myappointments,
};
