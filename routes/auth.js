const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    // if we found x-auth-token in header 
    // then the user is valid 
    const token = req.header('x-auth-token');


    if (!token) {
        // if not authorizatin is denied
        return res.status(401).json({ error: 'NO token, authorization denied' })

    }

    try {
        // when user found we verify that token to extract user info
        const decoded = jwt.verify(token, process.env.JWTTOKEN);
        req.user = decoded.user;
        // after the above process the next() will move to further process
        next()

    }
    catch (err) {
        console.log(err);
        res.status(401).json({ error: err });
    }

}    