var mongoose = require("mongoose");
var mongoDB = "mongodb://localhost:27017/";
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on("connected", function () {
  console.log("Mongoose default connection done");
});

db.on("error", function (err) {
  console.log("Error connecting" + err);
});
const User = require("./userschema");
module.exports = db;
