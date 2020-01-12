require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const authRouter = require("./routes/auth");
const homeRouter = require("./routes/home");
const verifyToken = require("./middlewares/verifyToken");

const app = express();
const port = process.env.PORT || 3000;

app.use(
	bodyparser.urlencoded({
		extended: true,
	}),
);
app.use(bodyparser.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 30 * 60 * 1000,
        },
	}),
);
app.set("view engine", "ejs");

const connect = mongoose.connect(process.env.MONGO_URI, {
	useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

if (process.env.ENVIRONMENT === "dev") app.use(cors());

app.use("/auth", authRouter);
app.use("/home", homeRouter);
app.use("/", verifyToken, (req, res) => { 
    res.redirect("/auth/login");
});

app.listen(port, () => {
	console.log(`Express server started at port: ${port}`);
});
