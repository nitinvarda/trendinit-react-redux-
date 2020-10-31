const express = require('express');
const router = express.Router();
const auth = require('../routes/auth');
const User = require('../models/userSchema');


// @desc Checking Authorization of user  
// @route GET /checkAuth
// @access Private
router.get("/", auth, async (req, res) => {

    try {
        // user details are extracted and sent in response
        const user = await User.findById(req.user.id).select('-password');

        res.json(user);

    }
    catch (err) {

        throw new Error('Not authorized,token failed')
    }
})

module.exports = router;