const jwt = require('jsonwebtoken');
require('dotenv').config()
const userDB = require('../Model/user')

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header is missing" });
        }

        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({ message:"Invalid authorization header format" });
        }

        const token = parts[1];
        console.log("Token:", token); // Log the token for debugging

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);

        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
            return res.status(401).json({ message: "Token expired" });
        }

        req.userId = decoded.sub._id;
        req.userName = decoded.sub.name;
        req.userEmail = decoded.sub.email;
        
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
};



module.exports = { verifyToken };
