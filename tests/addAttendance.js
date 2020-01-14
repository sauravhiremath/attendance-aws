const bcrypt = require("bcrypt");

const User = require("../models/student.model");

const courses = [
	"geometry",
	"physics",
	"chemistry",
	"algebra",
	"web dev",
	"machine learning",
	"digital logic",
];

const addStudents = async () => {
	for (let i = 0; i < 100; i++) {
		const randInt = getRandomInt(1, courses.length);
		const randomCoursesList = getRandom(courses, randInt);
		const passwordHashed = await bcrypt.hash("password" + i.toString(), 10);

		const student = new User({
			username: "sample" + i.toString(),
			password: passwordHashed,
			name: "sample" + i.toString(),
			email: "sample" + i.toString() + "@gmail.com",
			registeredCourses: randomCoursesList,
		});

		await student.save();
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

module.exports = addStudents;
