const mongoose = require("mongoose");

// Schema definition
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},

		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true
		},

		password: {
			type: String,
			required: true
		},

		role: {
			type: String,
			enum: ["jobSeeker", "recruiter"],
			default: "jobSeeker"
		}
	},
	{ timestamps: true } // auto add createdAt and updatedAt
);

// Create model from schema

const User = mongoose.model("User", userSchema);

module.exports = User;
