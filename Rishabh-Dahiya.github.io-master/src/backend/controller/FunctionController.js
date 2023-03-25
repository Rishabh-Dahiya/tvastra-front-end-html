const db = require("../database/conn");
const multer = require("multer");
const User = require("../database/userschema")
const docdetails = require("../database/doctordetails")

function bookingappointment(req,res){
    const {
        appointdate,
        instance,
        status,
        prevrecord,
        appointdetails
    } = req.body

    var info = {
        name : req.session.name,
        dateofbirth : req.session.dateofbirth,
        email : req.session.email,
        gender : req.session.gender,
        number : req.session.number,
        city : req.session.city,
        state : req.session.state,
        appointdate : appointdate,
        instance : instance,
        status : status,
        prevrecord : prevrecord,
        appointdetails : appointdetails
    }
    db.collection('appointments').findOne({instance:instance},function(err,result){
        if(err){
            console.log(err);
            throw err;
        }
        else{
            if(result){
                console.log("Already have an appointment")
                req.flash("error","Already have an appointment");
                res.render('appointment',{
                    messages : req.flash(),
                    username: req.session.name,
                    number: req.session.number,
                })
            }
            else{
                db.collection('appointments').insertOne(info,function(err,collection){
                    if(err){
                        console.log("error in appointments insertion");
                        throw err;
                    }
                    else{
                        console.log("appointment booked successfully" + collection);
                        req.flash('success','Appointment Booked');
                        req.session.appointdate =appointdate;
                        req.session.instance = instance;
                        req.session.status = status;
                        req.session.appointdetails = appointdetails;
                        return res.render("index",{
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
function removeappointment(req,res){
    const deleteinst = req.session.instance;
    console.log("delete inst " + deleteinst);
    db.collection("appointments").deleteOne({instance:deleteinst});
    res.render("myappointments",{
        messages:req.flash(),
        username: req.session.name,
        number: req.session.number,
        email: req.session.email,
        gender: req.session.gender,
        dateofbirth: req.session.dateofbirth,
        appointdate : req.session.appointdate,
        instance : req.session.instance,
        status : req.session.status,
        appointdetails : req.session.appointdetails 
    })
}

function feedbackmessage(req,res){
    const {
        name,email,subject,message
    } = req.body
    var feedback = {
        name : name,
        email : email,
        subject : subject,
        message : message
    }
    db.collection("Messages").insertOne(feedback,function(err,collection){
        if(err){
            console.log(err);
            throw err;
        }
        else{
            console.log("this is your message " + collection);
            req.flash("success","Message Sent");
            res.render("contactus",
            {
                messages : req.flash(),
                username: req.session.name,
                number: req.session.number,
            })
        }
    })
}
function askquery(req,res){
    const {
        name,email,number,query
    } = req.body
    var queries = {
        name : name,
        email : email,
        number : number,
       query: query
    }
    db.collection("Queries").insertOne(queries,function(err,collection){
        if(err){
            console.log(err);
            throw err;
        }
        else{
            console.log("this is your query " + collection);
            req.flash("success","Queries Asked");
            res.render("query",
            {
                messages : req.flash(),
                username: req.session.name,
                number: req.session.number,
            })
        }
    })
}

function cv(req,res){
    const {
        description,hospital,achievement,qualification,awards,specialization,fees,experience
    } = req.body;
    var fullinfo = {
        name: req.session.name,
        email: req.session.email,
        city: req.session.city,
        gender: req.session.gender,
        dateofbirth: req.session.dateofbirth,
        number: req.session.number,
        state: req.session.state,
        city: req.session.city,
        country: req.session.country,
        description :description,
        hospital:hospital,
        achievement:achievement,
        experience:experience,
        qualification:qualification,
        awards:awards,
        specialization:specialization,
        fees:fees,  
    }
    db.collection('resume').findOne({email:req.session.email},function(err,result){
        if(err){
            console.log(err);
            throw err;
        }
        else{
            if(result){
                console.log("Already Submitted");
                req.flash("warning","Already Submitted");
                res.render("doctor-signup",{
                    messages : req.flash(),
                    username: req.session.name,
                      number: req.session.number,
                })
            }
            else{
                db.collection('resume').insertOne(fullinfo,function(err,collection){
                    if(err){
                        console.log("error in resume insertion");
                        throw err;
                    }
                    else{
                        console.log("CV uploaded successfully" + collection);
                        req.flash('success','CV Uploaded');
                        req.session.appointdate = appointdate;
                        req.session.instance = instance;
                        req.session.status = status;
                        req.session.appointdetails = appointdetails;
                        return res.render("index",{
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
const updateprofile = async (req,res) => {
    console.log("this is inside of updateprofile")
    console.log("this is req.session.email" + req.session.email);
    const collectiondb = db.collection('users');
    console.log('this is the collection' + collectiondb);
    const userid =await db.collection('users').findOne({email:req.session.email});
    console.log("this is the user" + userid);
    const {
        name,
        email,
        gender,
        dateofbirth,
        number,
        state,
        city,
        country,
        description,
        hospital,
        achievement,
        experience,
        qualification,
        awards,
        specialization,
        fees,
        treatment
      } = req.body;

      const id1 = userid._id;
      console.log("this is id1 " + id1);
      var updated = await User.findByIdAndUpdate({_id:id1},{
        name: name,
        email: email,
        gender: gender,
        dateofbirth: dateofbirth,
        number:number,
        state: state,
        city: city,
        country: country,
        isdoctor: req.session.isdoctor,
      });

      if(req.session.isdoctor){
          const doc = await User.findOne({email:req.session.email});
          const id2 = doc._id;
          var updated2 = await User.findByIdAndUpdate({_id:id2},{
            description: description,
            email: email,
            hospital: hospital,
            achievement: achievement,
            experience: experience,
            qualification: qualification,
            awards: awards,
            treatment :treatment,
            specialization: specialization,
            fees: fees,
            name: name,
            email: email,
            gender: gender,
            dateofbirth: dateofbirth,
            number: number,
            state: state,
            city: city,
            country: country,
          });

          if(updated && updated2){
            req.session.name = name;
            req.session.email = email;
            req.session.number = number;
            req.session.gender = gender;
            req.session.dateofbirth = dateofbirth;
            req.session.state = state;
            req.session.isdoctor = updated.isdoctor;
            req.session.country = country;
            req.session.city = city;
            req.session.description = description;
            req.session.hospital = hospital;
            req.session.achievement = achievement;
            req.session.experience = experience;
            req.session.qualification = qualification;
            req.session.awards = awards;
            req.session.specialization = specialization;
            req.session.fees = fees;
            req.session.treatment = treatment;
            console.log("updation successful");
            req.flash("success","Updation successfull")
            res.render('dashboard',{
                messages : req.flash(),
                username: req.session.name,
                number: req.session.number,
                email: req.session.email,
                gender: req.session.gender,
                dateofbirth: req.session.dateofbirth,
                city: req.session.city,
                state: req.session.state,
                isdoctor: req.session.isdoctor,
                country: req.session.country,
                description :req.session.description,
                hospital:req.session.hospital,
                achievement:req.session.achievement,
                experience:req.session.experience,
                qualification:req.session.qualification,
                awards:req.session.awards,
                specialization:req.session.specialization,
                fees:req.session.fees,  
                treatment:req.session.treatment
            })
          }
          else{
              console.log("updation failed");
              req.flash("failed","Updation failed")
              res.render("dashboard",{
                  messages : req.flash(),
                  username: req.session.name,
                  number: req.session.number,
                  email: req.session.email,
                  gender: req.session.gender,
                  dateofbirth: req.session.dateofbirth,
                  city: req.session.city,
                  state: req.session.state,
                  isdoctor: req.session.isdoctor,
                  country: req.session.country,
                  description :req.session.description,
                  hospital:req.session.hospital,
                  achievement:req.session.achievement,
                  experience:req.session.experience,
                  qualification:req.session.qualification,
                  awards:req.session.awards,
                  specialization:req.session.specialization,
                  fees:req.session.fees,  
                  treatment:req.session.treatment
              })
          }
      }
      else{
          if(updated){
            req.session.name = name;
            req.session.email = email;
            req.session.number = number;
            req.session.gender = gender;
            req.session.dateofbirth = dateofbirth;
            req.session.state = state;
            req.session.isdoctor = updated.isdoctor;
            req.session.country = country;
            req.session.city = city;
            req.flash("success","Updation successfull")
            return res.render('dashboard',{
                messages : req.flash(),
                username: req.session.name,
                number: req.session.number,
                email: req.session.email,
                gender: req.session.gender,
                dateofbirth: req.session.dateofbirth,
                city: req.session.city,
                state: req.session.state,
                isdoctor: req.session.isdoctor,
                country: req.session.country,
                description :req.session.description,
                hospital:req.session.hospital,
                achievement:req.session.achievement,
                experience:req.session.experience,
                qualification:req.session.qualification,
                awards:req.session.awards,
                specialization:req.session.specialization,
                fees:req.session.fees,  
                treatment:req.session.treatment
            })
          }
          else{
            req.flash("failed","Updation failed")
            res.render('dashboard',{
                messages : req.flash(),
                username: req.session.name,
                number: req.session.number,
                email: req.session.email,
                gender: req.session.gender,
                dateofbirth: req.session.dateofbirth,
                city: req.session.city,
                state: req.session.state,
                isdoctor: req.session.isdoctor,
                country: req.session.country,
                description :req.session.description,
                hospital:req.session.hospital,
                achievement:req.session.achievement,
                experience:req.session.experience,
                qualification:req.session.qualification,
                awards:req.session.awards,
                specialization:req.session.specialization,
                fees:req.session.fees,  
                treatment:req.session.treatment
            })
          }
      }
}


   

module.exports ={
    bookingappointment : bookingappointment,
    feedbackmessage : feedbackmessage,
    askquery : askquery,
    cv : cv,
    updateprofile:updateprofile,
    removeappointment:removeappointment
}