const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const verifiedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData= verifiedToken;
        next();
    } catch (e) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
};