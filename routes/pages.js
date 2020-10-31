var express = require('express');
var router = express.Router();
var Article = require('../models/articleSchema');


// @desc Articles Home page  
// @route GET /home
// @access Public

router.get("/home", async (req, res, next) => {
    // this is home page article data which contains all posts data
    const pageSize = 9
    const page = Number(req.query.pageNumber) || 1

    try {
        const count = await Article.countDocuments()
        const articles = await Article.find().sort({ _id: -1 }).limit(pageSize).skip(pageSize * (page - 1))


        res.json({ articles, page, pages: Math.ceil(count / pageSize) })
    }
    catch (error) {
        throw new Error(error)
    }

})


// @desc Geting categorie wise articles
// @route GET /cat/:type
// @access Public

router.get("/cat/:type", async (req, res, next) => {
    // this is for specific category data
    // only that category posts data is sent
    try {
        const articles = await Article.find({ category: req.params.type }).limit(10).sort({ _id: -1 })
        res.json(articles)
    }
    catch (err) {
        throw new Error(err)

    }

})


module.exports = router;
