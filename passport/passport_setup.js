const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE = require('../api_keys/keys') // might need to change dir

passport.use(
  new GoogleStrategy({
    // options for google
    clientID: GOOGLE.CLIENT_ID,
    clientSecret: GOOGLE.CLIENT_SECRET,
    callbackURL: '/api/google/callback'
  }, ()=>{
      // passport callback
  })
);
