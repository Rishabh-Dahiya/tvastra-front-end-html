const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userappointment = new Schema({
  name: {
    type: String,
    
  },
  email:{
    type:String
  },
  city: {
    type: String,
    
  },
  state: {
    type: String, 
    
  },
  number: {
    type: String,
  },
  gender: {
    type: String,
    
  },
  dateofbirth: {
    type: String,
    
  },
  appointdate: {
    type: String,
    
  },
  instance: {
    type: String,
    
  },
  status: {
    type: String,
    
  },
  prevrecord: {
    type: String,
  },
  appointdetails: {
    type: String,
    
  },
});

const appointment = mongoose.model("Appointments", userappointment);
module.exports = appointment;
