const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE = require('../../api_keys/keys') // might need to change dir

passport.use(
  new GoogleStrategy({
    // options for google
    callback_url: '/api/google/callback',
    client_id: GOOGLE.CLIENT_ID,
    client_secret: GOOGLE.CLIENT_SECRET
  }, ()=>{
      // passport callback
  })
)
