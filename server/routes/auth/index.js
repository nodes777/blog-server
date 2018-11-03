const router = require("express").Router();
// /auth/auth
router.use("/auth", require("./blogAuth"));

module.exports = router;
