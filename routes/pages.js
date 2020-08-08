var express = require('express');
var router = express.Router();
var article = require('./articleSchema');




router.get("/home", function (req, res, next) {

    return article
        .find({})
        .limit(10)
        .sort({ _id: -1 })
        .exec((err, data) => {
            if (err) console.error(err);

            res.json(data);
        });

})

router.get("/cat/:type", (req, res) => {
    return article
        .find({ category: req.params.type })
        .limit(10)
        .sort({ _id: -1 })
        .exec((err, data) => {
            if (err) console.error(err);

            res.json(data);
        });

})


module.exports = router;
