const router = require("express").Router();
// /api/articles
router.use("/articles", require("./articles"));

module.exports = router;
