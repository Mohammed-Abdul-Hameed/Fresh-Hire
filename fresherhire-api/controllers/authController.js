const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// @desc    Register a new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
	const { name, email, password, role } = req.body;

	const validRoles = ["jobSeeker", "recruiter"];
	if (!validRoles.includes(role)) {
		return res.status(400).json({ message: "Invalid role" });
	}

	try {
		// Check if user already exists
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(400).json({ message: "User already exists" });
		}

		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create user with role
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
			role 
		});

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			token: generateToken(user._id)
		});
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// @desc    Login user
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		// Check if user exists
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		// Compare password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			token: generateToken(user._id)
		});
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

module.exports = { registerUser, loginUser };
