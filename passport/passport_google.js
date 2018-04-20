const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const CLIENT = require('../api_keys/keys')
const db = require('../firebase')

passport.serializeUser((user, done)=>{
  console.log(user);
  done(null, user.email)
})

passport.deserializeUser((id, done)=>{
  db.collection('users').doc(id).get().then(user =>{
      done(null, user)
  })
})

passport.use(
  new GoogleStrategy({
    // options for google
    clientID: CLIENT.GOOGLE.CLIENT_ID,
    clientSecret: CLIENT.GOOGLE.CLIENT_SECRET,
    callbackURL: '/api/google/redirect'
  }, (access_token, refresh_token, profile, done)=>{
      // check if user exists
      db.collection('users').doc(profile.emails[0].value).get().then(user =>{
        if(!user.exists){
          new_user = { // may put in diff file if i need it in other places
            id: profile.id,
            name: profile.name.givenName,
            photo: profile.photos[0].value,
            email: profile.emails[0].value
          }
          new_user.photo = new_user.photo.slice(0, -6) // trim ?sz=50 from photo url
          db.collection('users').doc(new_user.email).set(new_user).then(() =>{
            console.log('added to database'); // not really needed :rolling-eyes-emoji
            done(null, new_user)
            // prompt user for username to be added later (front end does this)
          })
        } else{
          console.log('user exists');
          done(null, user.data())
            // can redirect to home-page
        }
      })
  })
);
