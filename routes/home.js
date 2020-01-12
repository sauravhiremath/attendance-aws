const express = require("express");

const checkSession = require("../middlewares/checkSession");

const router = express.Router();

router.use(checkSession);

router.get("/", (req, res) => {
    res.send("hello");
});

module.exports = router;
