const express = require("express");

const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.use(verifyToken);

router.get("/", (req, res) => {
    res.send("hello");
});

module.exports = router;
