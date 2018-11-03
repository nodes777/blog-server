const router = require("express").Router();
const passport = require("passport");

console.log("in blogAuth");

/* GET Google Authentication API, from /auth */
router.get(
	"/",

	passport.authenticate("google", {
		// scope tells what info we want from google
		scope: ["profile"]
	})
);

//localhost:8000/auth/google/redirect?code=4/igDq4RfDw0p

router.get("/google/redirect", (req, res) => {
	res.send("you reached the redirect URI");
});

// (req, res, next) => {
// 	console.log("in get");
// 	// get all articles
// 	res.send("in auth");
// 	return;
// });

// router.get(
// 	"/auth/google",
// 	() => console.log("on auth page"),
// 	passport.authenticate("google", { scope: ["profile", "email"] })
// );

// router.get(
// 	"/google/callback",
// 	passport.authenticate("google", { failureRedirect: "/", session: false }),
// 	function(req, res) {
// 		const token = req.user.token;
// 		res.redirect("http://localhost:8080?token=" + token);
// 	}
// );

module.exports = router;
