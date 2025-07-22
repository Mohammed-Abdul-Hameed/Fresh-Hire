const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const protect = require("../middleware/auth");

// POST /api/jobs (only for recruiters)
router.post("/", protect, async (req, res) => {
	try {
		// Step 1: Check if user is recruiter
		if (req.user.role !== "recruiter") {
			return res.status(403).json({ message: "Access denied" });
		}

		// Step 2: Create a job
		const job = await Job.create({
			...req.body,
			postedBy: req.user._id
		});

		res.status(201).json(job);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error", error });
	}
});

module.exports = router;
