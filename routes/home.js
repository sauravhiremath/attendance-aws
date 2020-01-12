const express = require("express");

const Attendance = require("../models/courseAttendance.model");
const Teacher = require("../models/teacher.model");
const verifyToken = require("../middlewares/verifyToken");
const teacherRouter = require("./home.teacher");
const addAttendance = require("../tests/addStudents");

const router = express.Router();

router.use(verifyToken);

router.use("/teacher", teacherRouter);

router.get("/", async (req, res) => {
	console.log(req.user);
	if (req.user.domain === "teacher") {
		res.render("teacherHome");
	} else if (req.user.domain === "student") {
		res.render("studentHome");
	}
});

router.get("/getCourses", async (req, res) => {
	return res.json({
        courses: req.user.courses,
    });
});

module.exports = router;
