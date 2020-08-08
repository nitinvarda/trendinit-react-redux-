const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');


    if (!token) {
        return res.status(401).json({ error: 'NO token, authorization denied' })

    }

    try {
        const decoded = jwt.verify(token, process.env.JWTTOKEN);
        req.user = decoded.user;
        next()

    }
    catch (err) {
        console.log(err);
        res.status(401).json({ error: err });
    }

}    