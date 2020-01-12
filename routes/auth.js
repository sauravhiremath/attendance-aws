const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/student.model");
const Teacher = require("../models/teacher.model");
const checkSession = require("../middlewares/checkSession");

const router = express.Router();

// router.use(checkSession);

router.get("/register", async (req, res) => {
	res.render("register");
});

router.post("/register", async (req, res) => {
	const jsonResponse = {
		success: false,
		message: "defaultResponse",
		duplicates: [],
	};

	let user;
	if (req.body.domain === "student") {
		user = new Student({
			username: req.body.username,
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});
	} else if (req.body.domain === "teacher") {
		user = new Teacher({
			username: req.body.username,
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});
	} else {
		jsonResponse.message = "noDomainDefined";
		res.json(jsonResponse);
		return;
	}

	const duplicate = await User.findOne({
		$or: [{ email: user.email }, { username: user.username }],
	});
	if (duplicate) {
		jsonResponse.message = "duplicate";
		jsonResponse.duplicates = [];
		if (duplicate.email === user.email) {
			jsonResponse.duplicates.push("Email");
		}
		if (duplicate.username === user.username) {
			jsonResponse.duplicates.push("Username");
		}
		if (duplicate.regNo === user.regNo) {
			jsonResponse.duplicates.push("Registration Number");
		}

		res.json(jsonResponse);
		return;
	}

	const saltRounds = 10;

	user.password = await bcrypt.hash(req.body.password, saltRounds);

	await user.save();

	jsonResponse.success = true;
	jsonResponse.message = "registrationSuccess";

	res.json(jsonResponse);
});

router.get("/login", async (req, res) => {
	res.render("login");
});

router.post("/login", async (req, res) => {
	const jsonResponse = {
		success: false,
        message: "defaultResponse",
        jwtToken: ""
	};

	const { username, domain, password } = req.body;

	if (!username || !password || !domain) {
		jsonResponse.message = "serverError";
	}

	let client;

    if(domain === "teacher") {
        client = await Teacher.findOne({ username });
    } else if(domain === "student") {
        client = await User.findOne({ username });
    } else {
        json.message = "noDomainDefined";
        res.json(jsonResponse);

        return;
    }

	if (!client) {
		jsonResponse.success = false;
		jsonResponse.message = "incorrectDetails";
		res.json(jsonResponse);

		return;
	}

	if (await bcrypt.compare(password, client.password)) {
        const payload = {
            domain: domain,
            username: username
        }
        const jwtToken = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 36000 });
        if (!jwtToken) {
            jsonResponse.success = false;
            jsonResponse.message = "jwtSignFailed";
        } else {
            jsonResponse.success = true;
            jsonResponse.message = "loginSuccess";
            jsonResponse.jwtToken = jwtToken;
            req.session.jwtToken = jwtToken;
        }
	} else {
		jsonResponse.success = false;
        jsonResponse.message = "incorrectDetails";
	}

	res.json(jsonResponse);
});

router.use("/logout", async (req, res) => {
	req.session.destroy(() => {});

	res.json({
		success: true,
		message: "logoutSuccess",
	});
});

module.exports = router;
