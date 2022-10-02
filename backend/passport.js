const User = require("./user");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
  //   done(null, user.id);
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
  //   User.findById(id, function (err, user) {
  //     done(err, user);
  //   });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
      // User.findOrCreate(
      //   { googleId: profile.id, username: profile.id },
      //   function (err, user) {
      //     return cb(err, user);
      //   }
      // );
    }
  )
);
