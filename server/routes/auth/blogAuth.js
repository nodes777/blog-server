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

//localhost:8000/auth/auth/google/redirect?code=***

// passport.authenticate fires (in passport.js) before this next function
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
	// doing hack to encrypt a uri param, that will be used as token to client side.
	let saltRounds = 3;
	console.log(req.user._id);

	bcrypt.hash(req.user._id.toString(), saltRounds, function(err, hash) {
		req.session.user = hash;
		console.log(req.session);
		// send to a logged in URL? then clear clientside, this would jsut do client logged in conditional rendering?
		res.redirect(`http://localhost:8080/articles/loggedIn`);
	});

	// HOW TO REDIRECT TO LOCALHOST:8080 DYNAMICALLY WITH req.user???

	//res.redirect("../../../articles");
});

module.exports = router;
