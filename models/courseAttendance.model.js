const mongoose = require("mongoose");
const studentAttendanceSchema = require("./studentAttendance.schema");

const courseAttendanceSchema = new mongoose.Schema({
	date: {
		type: Date,
		required: true,
		index: true,
	},
	course: {
		type: String,
		required: true,
	},
	attendance: {
		type: [studentAttendanceSchema],
		default: [],
	},
});

module.exports = courseAttendanceSchema;
