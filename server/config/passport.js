const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const keys = require("./keys");
const User = require("../models/User");

// passport.serializeUser((user, done) => {
//   done(null, user);
// });
// passport.deserializeUser((user, done) => {
//   done(null, user);
// });
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/auth/google/redirect"
    },
    // fires in blogAuth router.get("/google/redirect"
    (accessToken, refreshToken, profile, done) => {
      console.log("in GoogleStrategy");
      console.log(profile);

      new User({
        googleId: profile.id,
        username: profile.displayName
      })
        .save()
        .then(newUser => {
          console.log("new user created: ", newUser);
        });
      // const userData = {
      //   email: profile.emails[0].value,
      //   name: profile.displayName,
      //   token: accessToken
      // };
      // done(null, userData);
    }
  )
);
