const express = require('express');
const router = express.Router();
const article = require('../models/articleSchema');


// @desc Geting individual article  
// @route GET /article/:id
// @access Public
router.get("/:id", (req, res) => {
    article.findById(req.params.id, (err, data) => {
        if (err) {
            throw new Error(err)

        }
        if (data) {
            res.json(data);
        }
        else {
            throw new Error('Article not found')
        }
    })
})


module.exports = router;