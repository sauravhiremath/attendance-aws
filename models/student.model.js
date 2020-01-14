const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		index: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		require: true,
		unique: true,
	},
	registeredCourses: {
		type: [String],
		required: true,
		default: [],
	},
});

module.exports = Student = mongoose.model("Student", studentSchema);
