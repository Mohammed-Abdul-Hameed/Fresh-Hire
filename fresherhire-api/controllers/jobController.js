const Job = require("../models/Job");

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private (only recruiters)
const createJob = async (req, res) => {
	try {
		// Only recruiters can post jobs
		if (req.user.role !== "recruiter") {
			return res.status(403).json({ message: "Access denied" });
		}

		const { title, description, salary, location, remote } = req.body;

		if (!title || !description || !location) {
			return res.status(400).json({ message: "Please fill all required fields" });
		}

		const job = new Job({
			title,
			description,
			salary,
			location,
			remote,
			postedBy: req.user._id
		});

		const createdJob = await job.save();

		res.status(201).json(createdJob);
	} catch (error) {
		console.error("Job creation error:", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

module.exports = { createJob };
