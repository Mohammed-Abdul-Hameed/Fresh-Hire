// Load environment variables from .env
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/User");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/auth");

// Initialize express app
const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Configure dotenv
dotenv.config();

// Connect to MongoDB
connectDB();

app.get("/", async (req, res) => {
	try {
		const user = await User.findOne({});
		res.json(user);
	} catch (err) {
		res.status(500).json({ message: "Error fetching users", error: err.message });
	}
});

// Simple GET route
app.get("/api/health", (req, res) => {
	res.json({ status: "ok" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`🚀 Server running on http://localhost:${PORT}`);
});
