const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const Job = require("../models/Job");
const protect = require("../middleware/auth");

// POST /api/jobs/:id/apply
// Using a dynamic route for the "id" as it goig to change
router.post("/jobs/:id/apply", protect, async (req, res) => {
	try {
		// Check if user is a recruiter
		if (req.user.role === "recruiter") {
			return res.status(403).json({ message: "Recruiters cannot apply to jobs" });
		}

		// 2Check if job exists
		const job = await Job.findById(req.params.id);
		if (!job) {
			return res.status(404).json({ message: "Job not found" });
		}

		// Check if already applied
		const existing = await Application.findOne({
			job: job._id,
			applicant: req.user._id
		});

		if (existing) {
			return res.status(400).json({ message: "You have already applied to this job" });
		}

		// Create application
		const application = await Application.create({
			job: job._id,
			applicant: req.user._id,
			coverLetter: req.body.coverLetter || "",
			resume: req.body.resume || "" // For now, string. We'll add actual file upload later.
		});

		res.status(201).json({ message: "Application submitted", application });
	} catch (err) {
		console.error("Error applying to job:", err);
		res.status(500).json({ message: "Server error", error: err });
	}
});

module.exports = router;
