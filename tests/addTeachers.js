const bcrypt = require("bcrypt");

const Teacher = require("../models/teacher.model");

const courses = [
	"geometry",
	"physics",
	"chemistry",
	"algebra",
	"web dev",
	"machine learning",
	"digital logic",
];

const addTeachers = async () => {
	for (let i = 0; i < courses.length; i++) {
		const teacherCourse = [courses[i]];
		const passwordHashed = await bcrypt.hash("password" + i.toString(), 10);

		const teacher = new Teacher({
			username: "teacher" + i.toString(),
			password: passwordHashed,
			name: "teacher" + i.toString(),
			email: "teacher" + i.toString() + "@gmail.com",
			courses: teacherCourse,
		});

		await teacher.save();
	}
};

function getRandom(arr, n) {
	let result = new Array(n);
	let len = arr.length;
	let taken = new Array(len);
	if (n > len) throw new RangeError("getRandom: more elements taken than available");
	while (n--) {
		var x = Math.floor(Math.random() * len);
		result[n] = arr[x in taken ? taken[x] : x];
		taken[x] = --len in taken ? taken[len] : len;
	}
	return result;
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = addTeachers;
