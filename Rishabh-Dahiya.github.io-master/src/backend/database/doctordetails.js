const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userschema = new Schema({
  name: {
    type: String,
    
  },
  email: {
    type: String,
    
  },
  description: {
    type: String,
    
  },
  image: {
    type: String,
  },
  hospital: {
    type: String,
    allowNull: false
   
  },
  achievement: {
    type: String,
    allowNull: false
  },
  treatment:{
    type:String,
    allowNull: false
  },
  qualification: {
    type: String,
    allowNull: false
  },
  awards: {
    type: String,
    allowNull: false
  },
  specialization: {
    type: String,
    allowNull: false
  },
  fees: {
    type: String,
    allowNull: false
  },
  password: {
    type: String,
    
  },
  number: {
    type: Number,
    unique: true,
  },
  gender: {
    type: String,
    
  },
  dateofbirth: {
    type : String,
    
  },
  city: {
    type: String,
    
  },
  state: {
    type: String,
    
  },

  country: {
    type: String,
    
  },
  expierence: {
    type: String,
    
  },
});

const docdetails = mongoose.model("DOCDETAIL", userschema);
module.exports = docdetails;
