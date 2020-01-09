const mongoose = require("mongoose");

const studentAttendanceSchema = new mongoose.Schema({
	regNo: {
		type: String,
		required: true,
	},
	attendance: {
		enum: ["present", "absent", "onDuty"],
		required: true,
	},
});

module.exports = studentAttendanceSchema;
