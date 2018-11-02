const router = require("express").Router();
const passport = require("passport");

console.log("in blogAuth");

/* GET Google Authentication API. */
router.get("/", (req, res, next) => {
	console.log("in get");
	// get all articles
	return;
});

// router.get(
// 	"/auth/google",
// 	() => console.log("on auth page"),
// 	passport.authenticate("google", { scope: ["profile", "email"] })
// );

router.get(
	"/auth/google/callback",
	passport.authenticate("google", { failureRedirect: "/", session: false }),
	function(req, res) {
		const token = req.user.token;
		res.redirect("http://localhost:8080?token=" + token);
	}
);

module.exports = router;
