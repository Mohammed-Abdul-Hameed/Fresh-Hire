const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const protect = require("../middleware/auth");

// POST /api/jobs (only for recruiters)

router.post("/", protect, async (req, res) => {
	try {
		if (req.user.role !== "recruiter") {
			return res.status(403).json({ message: "Access denied" });
		}

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

// /api/jobs (public route)
router.get("/", async (req, res) => {
	try {
		const jobs = await Job.find().populate("postedBy", "name email").sort({ createdAt: -1 });
		res.status(200).json(jobs);
	} catch (error) {
		console.error("Error fetching jobs:", error);
		res.status(500).json({ message: "Server error" });
	}
});

router.get("/my-jobs", protect, async (req, res) => {
	try {
		const jobs = await Job.find({ postedBy: req.user._id }).populate("postedBy", "name email");
		res.status(200).json(jobs);
	} catch (error) {
		console.error("Error fetching user's jobs:", error);
		res.status(500).json({ message: "Server error" });
	}
});

// PUT /api/jobs/:id
router.put("/:id", protect, async (req, res) => {
	try {
		// Step 0: Validate request body
		if (!req.body.title || !req.body.description) {
			return res.status(400).json({ message: "Title and description are required" });
		}
		// Step 1: Find job by ID
		const job = await Job.findById(req.params.id);

		// Step 2: If not found => 404
		if (!job) {
			return res.status(404).json({ message: "Job not found" });
		}

		// Step 3: Check if current user owns this job
		if (job.postedBy.toString() !== req.user._id.toString()) {
			return res.status(403).json({ message: "Access denied" });
		}

		// Step 4: Update job with new data
		const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });

		// Step 5: Return updated job
		res.status(200).json(updated);
	} catch (err) {
		console.error("Error updating job:", err);
		res.status(500).json({ message: "Server error" });
	}
});

// DELETE /api/jobs/:id (Only job owner can delete)
router.delete("/:id", protect, async (req, res) => {
	try {
		const job = await Job.findById(req.params.id);

		if (!job) {
			return res.status(404).json({ message: "Job not found" });
		}

		// Only recruiter who created the job can delete
		if (job.postedBy.toString() !== req.user._id.toString()) {
			return res.status(403).json({ message: "Not authorized to delete this job" });
		}

		await job.remove();

		res.status(200).json({ message: "Job deleted successfully" });
	} catch (error) {
		console.error("Error deleting job:", error);
		res.status(500).json({ message: "Server error", error });
	}
});

module.exports = router;
