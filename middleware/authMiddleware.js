const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.cookies.token;
    //checks if token present or not 
    if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};