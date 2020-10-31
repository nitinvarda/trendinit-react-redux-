var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// this is article schema 
// the post data is stored in this format in database
var postdata = new Schema({
    title: { type: String, required: true },
    category: { type: String },
    date: { type: String, required: true },
    by: { type: String, required: true },
    imagename: { type: String },
    desc: { type: String, required: true },
});

module.exports = mongoose.model("article", postdata);;
