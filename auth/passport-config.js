import passport from 'passport'
import passportGoogleStrategy from 'passport-google-oauth20'

const dotenv = require('dotenv').config()


const GoogleStrategy = passportGoogleStrategy.Strategy;



passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
  
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.O_AUTH_CLIENT,
    clientSecret: process.env.O_AUTH_CLIENT_SECRET,
    callbackURL: "https://mernslotbooking.herokuapp.com/api/redirect/",
  },
  function(accessToken, refreshToken, profile, done) {

    return done(null, profile);
  }
));