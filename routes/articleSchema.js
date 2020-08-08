var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var postdata = new Schema({
    title: { type: String, required: true },
    category: { type: String },
    date: { type: String, required: true },
    by: { type: String, required: true },
    imagename: { type: String },
    desc: { type: String, required: true },
});

module.exports = mongoose.model("article", postdata);;
