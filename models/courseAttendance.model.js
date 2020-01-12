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
		index: true,
	},
	attendance: {
		type: [studentAttendanceSchema],
		default: [],
	},
});

module.exports = Attendance = mongoose.model("Attendance", courseAttendanceSchema);
