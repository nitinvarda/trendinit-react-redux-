const express = require('express');
const router = express.Router();
const article = require('./articleSchema');

router.get("/:id", (req, res) => {
    article.findById(req.params.id, (err, data) => {
        if (err) return res.status(404).json({ error: "error" });
        if (data) {
            res.json(data);
        }
        else {
            res.status(404).json({ error: "file not found" })
        }
    })
})


module.exports = router;