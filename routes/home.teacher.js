const express = require("express");

const Attendance = require("../models/courseAttendance.model");
const Teacher = require("../models/teacher.model");
const Student = require("../models/student.model");
const verifyToken = require("../middlewares/verifyToken");
const addAttendance = require("../tests/addStudents");

const router = express.Router();

router.use(verifyToken);

router.get("/submit", async(req, res) => {
    console.log("entered submuit");
    const jsonResponse = {
		success: false,
		message: "defaultResponse",
	};

    const { course, date } = req.query;
    console.log(req.query);
    const username = req.user.username;

    if(!course || !date || !username) {
        jsonResponse.message = "missingDetails",
        res.json(jsonResponse);

        return;
    }

    const studentsList = await Student.find({ course });

    console.log(studentsList);

    // res.render("editAttendance", { studentsList: studentsList, date: date, username: username });
    res.json({
        success: true,
        studentsList: studentsList,
    });

    return;
});

router.get("/attendance", async (req, res) => {
	const jsonResponse = {
		success: false,
		message: "defaultResponse",
	};

    const { course, date, attendanceList } = req.body;
    const username = req.user.username;

	if (!attendanceList || !course || !date) {
        jsonResponse.message = "missingDetails";
        jsonResponse.success = false;
        res.json(jsonResponse);

        return;
    }
    
    const teacherDetails = await Teacher.findOne({ username });

    if (teacherDetails.courses.indexOf(course) === -1) {
        jsonResponse.message = "invalidCourse";
        jsonResponse.success = false;
        res.json(jsonResponse);

        return;
    }

	const prevRecord = await Attendance.findOne({
		$and: [{ course: course }, { date: date }],
    });
    
	if (prevRecord) {
		// This will upsert the changes with a warning, rather than an error
		const currAttendance = await Attendance.update({ course, date }, req.body, {
			upsert: true,
		});

		if (currAttendance) {
			jsonResponse.message = "duplicate";
			json.success = true;
			res.json(jsonResponse);
		} else {
            jsonResponse.message = "upsertFailed";
            jsonResponse.success = false,
            res.json(jsonResponse);
        }

		return;
	}

	const attendance = new Attendance({
		date: date,
		course: course,
		attendance: attendanceList,
    });
    
    await attendance.save();

    jsonResponse.success = true;
    jsonResponse.message = "attendanceUpdated";
    res.json(jsonResponse);

    return;
});

module.exports = router;