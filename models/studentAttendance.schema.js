const mongoose = require("mongoose");

const studentAttendanceSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	attendance: {
		type: String,
		enum: ["present", "absent", "onDuty"],
		required: true,
	},
});

module.exports = studentAttendanceSchema;
