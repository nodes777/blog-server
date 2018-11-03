const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const keys = require("./keys");

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
    (accessToken, refreshToken, profile, done) => {
      console.log("in GoogleStrategy");

      // const userData = {
      //   email: profile.emails[0].value,
      //   name: profile.displayName,
      //   token: accessToken
      // };
      // done(null, userData);
    }
  )
);
