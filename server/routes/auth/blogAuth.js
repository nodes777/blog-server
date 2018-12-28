const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcrypt");

/* GET Google Authentication API, from /auth */
router.get(
	"/",
	passport.authenticate("google", {
		// scope tells what info we want from google
		scope: ["profile"]
	})
);

//localhost:8000/auth/logout
router.get("/logout", (req,res) => {
	req.logout();
	res.redirect(`http://localhost:8080/articles`);
});

//localhost:8000/auth/auth/google/redirect?code=***

// passport.authenticate fires (in passport.js) before this function
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {

		//set the session
		req.session.user = req.user._id.toString();
		console.log("req.user._id" + req.user._id.toString())

		// send to a logged in URL? then clear clientside, this would jsut do client logged in conditional rendering?
		res.redirect(`http://localhost:8080/articles/loggedIn`);
	
		// HOW TO REDIRECT TO LOCALHOST:8080 DYNAMICALLY WITH req.user???
});

module.exports = router;
