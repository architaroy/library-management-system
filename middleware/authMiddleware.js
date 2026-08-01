const jwt = require("jsonwebtoken");
const { deleteOne } = require("../models/User");

const authMiddleware = (req, res, next) => {
    try {
        // Get token from request header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided.",
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Save user information
        req.user = decoded;

        // Go to next middleware
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

module.exports = authMiddleware;