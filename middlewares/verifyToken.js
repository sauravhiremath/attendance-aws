const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
const verifyToken = async (req, res, next) => {
	const jwtToken = req.cookies.jwtToken || "";
	console.log(jwtToken);
	try {
		if (jwtToken === "") {
			console.log("IN redirect route of verifyToken");
			return res.redirect("/auth/login");
		}
		const decrypt = jwt.verify(jwtToken, process.env.JWT_SECRET);
		req.user = {
			username: decrypt.username,
			domain: decrypt.domain,
			courses: decrypt.courses,
		};
		next();
	} catch (err) {
		return res.status(500).json(err.toString());
	}
};

module.exports = verifyToken;
