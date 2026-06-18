const jwt = require("jsonwebtoken");

function adminMiddleware (req, res, next){
    if(req.user.role !== "admin"){
        res.status(403).json({
            message: "Anda tidak memiliki akses!"
        });
    }
    next()
}

module.exports = adminMiddleware;