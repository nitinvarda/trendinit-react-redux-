var express = require('express');
var router = express.Router();

var User = require('./userSchema');
const jwt = require('jsonwebtoken');


router.post("/", (req, res) => {

    // this is login request 
    // search for the username first
    User.findOne({ name: req.body.username }, (err, file) => {
        if (err) return console.error(err);
        // if user found
        if (file) {
            // check for the passwords
            if (file.password === req.body.password) {
                // if password matches 
                const payload = {
                    user: {
                        id: file.id,
                        name: file.name

                    }
                }
                // token is sent 
                jwt.sign(
                    payload, process.env.JWTTOKEN, { expiresIn: 15 * 60 },
                    (err, token) => {
                        if (err) throw err;
                        res.json({ token });
                    }
                );

            }
            // if passwords do not match
            else {
                // responds as invalid password
                return res.status(401).json({ error: 'invalid password' });
            }
        }
        // if user not found
        else {
            //responds a account doesn't exists
            return res.status(401).json({ error: "account doesn't exists" });
        }
    })

});



module.exports = router;