module.exports = (req, res, next) => {
    if (req.userData.admin){
        next()
    } else {
        res.status(401).json({
            message: "You're not allowed to come here biatch"
        })
    }
};