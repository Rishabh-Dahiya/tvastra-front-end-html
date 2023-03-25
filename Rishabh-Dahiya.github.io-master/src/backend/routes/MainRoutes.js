const express = require("express");
const mainController = require("../controller/MainController");
const path = require("path");

const signupController = require("../controller/SignupController");
const loginController = require("../controller/LoginController");
const router = express.Router();
const middle = require("../controller/middle");
const FunctionController = require("../controller/FunctionController");

router.route("/").get(mainController.index);
router.route("/index.ejs").get(mainController.index);
router.route("/doctor.ejs").get(mainController.doctor);
router.route("/healthy.ejs").get(mainController.healthy);
router.route("/about-hospital.ejs").get(mainController.about_hospital);
router.route("/about-doctor.ejs").get(mainController.about_doctor);
router.route("/faq.ejs").get(mainController.faq);
router.route("/hospital.ejs").get(mainController.hospital);
router.route("/query.ejs").get(mainController.query);
router.route("/treatment.ejs").get(mainController.treatment);
router.route("/tvastra-plus.ejs").get(mainController.tvastra_plus);
router.route("/otp-password.ejs").get(mainController.otp_password);
router.route("/password-user.ejs").get(mainController.password_user);
router.route("/phone-login.ejs").get(mainController.phonelogin);
router.route("/logout.ejs").get(mainController.logout);
router.route("/dashboard").get(mainController.dashboard);

router.route("/login.ejs").get(mainController.login);
router.route("/signup.ejs").get(mainController.signup);
router.route("/doctor-signup.ejs").get(mainController.doctor_signup);
router.route("/appointment.ejs").get(mainController.appointment);
router.route("/appointment").get(mainController.appointment);
router.route("/contactus.ejs").get(mainController.contactus);
router.route("/myappointments").get(mainController.myappointments);
router.route("/signup").get(mainController.signup);
router.route("/otp").get(mainController.otp);

//post
router.route("/login").post(loginController.login);
router.route("/signup").post(signupController.signup);
router.route("/password-user").post(loginController.checkuserid);
router.route("/otp-password").post(loginController.changepassword);
router.route("/appointment").post(FunctionController.bookingappointment);
router.route("/feedbackmessages").post(FunctionController.feedbackmessage);
router.route("/askquery").post(FunctionController.askquery);
router.route("/uploadcv").post(signupController.docdetailsregister);
router.route("/dashboard").post(FunctionController.updateprofile);
router.route("/myappointment").post(FunctionController.removeappointment);

module.exports = router;
