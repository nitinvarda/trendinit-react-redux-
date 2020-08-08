var express = require('express');
var router = express.Router();
var article = require("../articleSchema");
var auth = require('../auth');


router.get("/", function (req, res, next) {

    return article
        .find({})
        .limit(10)
        .sort({ _id: -1 })
        .exec((err, data) => {
            if (err) console.error(err);
            res.json(data);
        });





})

module.exports = router;