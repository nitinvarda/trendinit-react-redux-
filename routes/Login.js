var express = require('express');
var router = express.Router();

var User = require('./userSchema');
const jwt = require('jsonwebtoken');


router.post("/", (req, res) => {


    User.findOne({ name: req.body.username }, (err, file) => {
        if (err) return console.error(err);
        if (file) {
            if (file.password === req.body.password) {
                const payload = {
                    user: {
                        id: file.id,
                        name: file.name

                    }
                }
                jwt.sign(
                    payload, process.env.JWTTOKEN, { expiresIn: 15 * 60 },
                    (err, token) => {
                        if (err) throw err;
                        res.json({ token });
                    }
                );

            }
            else {
                return res.status(401).json({ error: 'invalid password' });
            }
        }
        else {
            return res.status(401).json({ error: "account doesn't exists" });
        }
    })

});






module.exports = router;