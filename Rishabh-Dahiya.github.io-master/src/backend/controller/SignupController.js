const db = require("../database/conn");
const multer = require("multer");
function signup(req, res) {
  const {
    name,
    email,
    password,
    number,
    gender,
    dateofbirth,
    city,
    state,
    country,
    isdoctor,
  } = req.body;

  if (!(name && email && password))
    return res.render("signup", {
      msg: "Please enter all the required details",
    });
  else {
    var data = {
      name: name,
      email: email,
      password: password,
      number: number,
      gender: gender,
      dateofbirth: dateofbirth,
      city: city,
      state: state,
      country: country,
      isdoctor: isdoctor,
    };

    db.collection("users").findOne(
      { email: email},
      "*",
      function (err, result) {
        if (err) {
          console.log(err);
          throw err;
        } else {
          if (result) {
            console.log("user already present");
            req.flash("warning", "Please try with different email");
            res.render("signup", {
              messages: req.flash(),
            });
          } else {
            if (isdoctor) {
              req.session.name = data.name;
              req.session.email = data.email;
              req.session.number = data.number;
              req.session.password = data.password;
              req.session.city = data.city;
              req.session.state = data.state;
              req.session.country = data.country;
              req.session.dateofbirth = data.dateofbirth;
              req.session.gender = data.gender;
              req.session.isdoctor = data.isdoctor;
              console.log("this is before rendering doctoro-signup " + data.name);
           res.render("doctor-signup");
          }
          else{
            db.collection("users").insertOne(data, function (err, collection) {
              if (err) {
                console.log(err);
                throw err;
              } 
                 else {
                  console.log("Record inserted Successfully" + collection);
                  req.flash("success", "Record inserted succesfully");
                  res.render("login", {
                    messages: req.flash(),
                  });
                }
              
            });
          }
          }
        }
      }
    );
  }
}

function docdetailsregister(req,res){
  const {
      description,hospital,achievement,treatment,qualification,awards,specialization,fees,experience
  } = req.body;
  var fullinfo = {
      name: req.session.name,
      email: req.session.email,
      city: req.session.city,
      password : req.session.password,
      gender: req.session.gender,
      dateofbirth: req.session.dateofbirth,
      number: req.session.number,
      state: req.session.state,
      city: req.session.city,
      country: req.session.country,
      isdoctor : req.session.isdoctor,
      description :description,
      hospital:hospital,
      achievement:achievement,
      treatment : treatment,
      experience:experience,
      qualification:qualification,
      awards:awards,
      specialization:specialization,
      fees:fees,  
  }
  db.collection('users').findOne({email:req.session.email},function(err,result){
      if(err){
          console.log(err);
          throw err;
      }
      else{
          if(result){
              console.log("User Already Present");
              req.flash("warning","User Already Present");
              res.render("doctor-signup",{
                  messages : req.flash(),
                  username: req.session.name,
                    number: req.session.number,
              })
          }
          else{
              db.collection('users').insertOne(fullinfo,function(err,collection){
                  if(err){
                      console.log("error in doctor signup");
                      throw err;
                  }
                  else{
                      console.log("Record inserted Successfully" + collection);
                      req.flash('success','Record inserted Successfully')
                      return res.render("login",{
                          messages : req.flash(),
                          username: req.session.name,
                          number: req.session.number,
                      })
          
                  }
              })
          }
      }
  })
}
module.exports = {
  signup: signup,
  docdetailsregister: docdetailsregister
};
