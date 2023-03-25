const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userfeedback = new Schema({
  name: {
    type: String,
    required : true,
  },
  email: {
    type: String,
    required : true,
  },
  subject:{
    type: String,
    required : true,
  },
  message: {
    type: String,
    required : true,
  },
});

const askquery = new Schema({
  name: {
    type: String,
    required : true,
  },
  email: {
    type: String,
    required : true,
  },
  number : {
    type: String,
    allowNull : false
  },
  query: {
    type: String,
    required : true,
  },
});


const message = mongoose.model("Appointments", userfeedback);
const query = mongoose.model("Queries", query);
module.exports = message;
