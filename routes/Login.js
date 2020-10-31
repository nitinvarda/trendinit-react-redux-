var express = require('express');
var router = express.Router();

var User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const { exists } = require('../models/userSchema');



// @desc Admin Logging route  
// @route POST /login
// @access Public

router.post("/", (req, res, next) => {

    // this is login request 
    // search for the username first
    User.findOne({ name: req.body.username }, (err, file) => {
        if (err) {
            throw new Error(err)
        }
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
                res.status(401)
                const error = new Error('invalid password')

                next(error)
            }
        }
        // if user not found
        else {
            //responds a account doesn't exists
            res.status(401)
            const err = new Error('Account doestn\'t exists')
            next(err)


        }
    })

});



module.exports = router;