var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var userdata = new Schema({
    name: { type: String, required: true },
    password: { type: String },
});

module.exports = mongoose.model("new", userdata);
