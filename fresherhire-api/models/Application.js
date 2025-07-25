const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
	job: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Job",
		required: true
	},
	applicant: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	resume: {
		type: String, // will store a URL or file path
		default: ""
	},
	coverLetter: {
		type: String,
		default: ""
	},
	appliedAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Application", applicationSchema);
