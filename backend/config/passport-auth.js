const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20');
const MongooseService = require('../services/mongoose-service')

passport.use('google',
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/authentication/google-redirect'
  },
  async (accessToken, refreshToken, profile, done) => {
    const userReturned = await MongooseService.findUserByGoogleId(profile.id)
    console.log('user returned', userReturned)
    if(!userReturned){
      const newUser = await MongooseService.createNewUser({
        googleProfileId: profile.id,
        username: null,
        displayName: profile.name.givenName,
        avi: profile.photos[0].value // i think this is wrong lol
      })
      done(null, newUser)
    } else {
      done(null, userReturned)
    }
  })
)
