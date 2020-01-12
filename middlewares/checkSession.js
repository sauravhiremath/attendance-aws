const jwt = require("jsonwebtoken");

const checkSession = (req, res, next) => {
    console.log(req.session.jwtToken);
    try {
        if(!req.session.jwtToken) {
            res.redirect("/auth/login");
        } else {
            const decoded = jwt.verify(req.session.jwtToken, process.env.JWT_SECRET);
            if (!decoded) {
                res.redirect("/auth/login");
            } else {
                next();
            }
        }
        
    } catch (error) {
        // console.log(error);
        res.redirect("/auth/login");
    }
}

module.exports = checkSession;