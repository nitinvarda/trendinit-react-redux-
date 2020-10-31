const express = require('express');
const router = express.Router();
const article = require('../models/articleSchema');


// @desc Getting articles by author  
// @route GET /by/:name
// @access Public
router.get("/:name", (req, res) => {
    article.find({ by: req.params.name }).sort({ _id: -1 }).exec((err, data) => {
        if (err) {
            throw new Error(err)
        }
        if (data) {
            res.json(data);
        }
        else {
            throw new Error('No Data Found')
        }
    })
})


module.exports = router;