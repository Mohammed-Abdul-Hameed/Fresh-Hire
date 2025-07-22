const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		salary: {
			type: Number
		},
		location: {
			type: String
		},
		remote: {
			type: Boolean,
			default: false
		},
		postedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		}
	},
	{ timestamps: true } // adds createdAt and updatedAt
);

module.exports = mongoose.model("Job", jobSchema);
