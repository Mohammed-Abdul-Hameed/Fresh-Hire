const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
	let token;

	// Check if token exists in header
	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
		try {
			// Get token from header
			token = req.headers.authorization.split(" ")[1];

			// Verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// Find user in DB and attach to req.user (excluding password)
			req.user = await User.findById(decoded.id).select("-password");

			next(); // continue to actual route
		} catch (error) {
			return res.status(401).json({ message: "Not authorized, token failed" });
		}
	}

	if (!token) {
		return res.status(401).json({ message: "Not authorized, no token" });
	}
};

module.exports = protect;
