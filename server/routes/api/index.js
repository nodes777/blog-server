const router = require("express").Router();

router.use("/articles", require("./articles"));
router.use("/auth", require("./blogAuth"));

module.exports = router;
