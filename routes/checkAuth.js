const express = require('express');
const router = express.Router();
const auth = require('../routes/auth');
const User = require('./userSchema');


// this is for checking authorization 
// we have auth middleware which authorizes user
router.get("/", auth, async (req, res) => {

    try {
        // user details are extracted and sent in response
        const user = await User.findById(req.user.id).select('-password');

        res.json(user);

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;