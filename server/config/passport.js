const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const keys = require("./keys");
const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/auth/google/redirect"
    },
    // fires in blogAuth router.get("/google/redirect"
    (accessToken, refreshToken, profile, done) => {
      // findOne looks for a googleId prop matching a profile.id, that comes from Google
      // if it finds a match, it returns that user
      User.findOne({ googleId: profile.id }).then(currentUser => {
        // if we have a user
        if (currentUser) {
          console.log(`User is ${currentUser}`);

          done(null, currentUser);
        } else {
          // we don't have a user
          console.log("No you can't create a new user");
          // new User({
          //   googleId: profile.id,
          //   username: profile.displayName
          // })
          //   .save()
          //   .then(newUser => {
          //     console.log("new user created: ", newUser);
          //     done(null, newUser);
          //   });
        }
      });
    }
  )
);
