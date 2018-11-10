const router = require("express").Router();
const passport = require("passport");

/* GET Google Authentication API, from /auth */
router.get(
	"/",

	passport.authenticate("google", {
		// scope tells what info we want from google
		scope: ["profile"]
	})
);

//localhost:8000/auth/auth/google/redirect?code=***

// passport.authenticate fires (in passport.js) before this next function
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
	//res.send("you reached the redirect URI" + req.user);
	// HOW TO REDIRECT TO LOCALHOST:8080 DYNAMICALLY WITH req.user???

	res.redirect("../../../articles");
});

module.exports = router;
