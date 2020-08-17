const express = require('express');
const router = express.Router();
const article = require('../articleSchema');


// when admin wants to edit the post 
// the id of the post is used for fetching the current data and later it is modified and submitted again
router.get("/:id", (req, res) => {
    article.findById(req.params.id, (err, file) => {
        if (err) return res.status(404).json({ error: "error in finding the file" });
        if (file) {
            res.json(file);
        }
        else {
            res.status(404).json({ error: "file not found" });
        }
    })
})


module.exports = router;