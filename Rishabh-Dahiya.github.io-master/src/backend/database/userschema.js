const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userschema = new Schema({
  name: {
    type: String,
    required : true,
  },
  email: {
    type: String,
    unique: true,
    required : true,
  },
  password: {
    type: String,
    required : true,
  },
  number: {
    type: String,
  },
  gender: {
    type: String,
    required : true,
  },
  dateofbirth: {
    type: String,
    required : true,
  },
  isdoctor: {
    type: Boolean
  },
  city: {
    type: String,
    required : true,
  },
  state: {
    type: String,
    required : true,
  },

  country: {
    type: String,
    required : true,
  },
});

const signupdata = mongoose.model("user", userschema);
module.exports = signupdata;
