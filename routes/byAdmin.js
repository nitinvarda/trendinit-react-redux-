const express = require('express');
const router = express.Router();
const article = require('./articleSchema');


router.get("/:name", (req, res) => {
    article.find({ by: req.params.name }).sort({ _id: -1 }).exec((err, data) => {
        if (err) res.status(404).json({ error: err });
        if (data) {
            res.json(data);
        }
        else {
            res.status(404).json({ error: "user not found" });
        }
    })
})


module.exports = router;