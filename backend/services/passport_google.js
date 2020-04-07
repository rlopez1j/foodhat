const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const CLIENT = require('../../api_keys/keys')
const db = require('../firebase')

passport.serializeUser((user, done)=>{
  done(null, user.id)
})

passport.deserializeUser((user, done)=>{
  console.log('serial:', user);
  db.collection('users').doc(user).get().then(user =>{
      done(null, user)
  })
})

passport.use(
  new GoogleStrategy({
    // options for google
    clientID: CLIENT.GOOGLE.CLIENT_ID,
    clientSecret: CLIENT.GOOGLE.CLIENT_SECRET,
    callbackURL: '/api/google/redirect'
  },
  (access_token, refresh_token, profile, done)=>{
      // check if user exists
      db.collection('users').doc(profile.id)
      .get()
      .then(user =>{

        if(!user.exists){
          new_user = { // may put in diff file if i need it in other places
            id: profile.id,
            username: null,
            name: profile.name.givenName,
            photo: profile.photos[0].value,
            search: []
          }

          friends = {
            friend_requests: [],
            friends_list: [],
            pending_requests: []
          }

          fcm = {
            fcm_token: null
          }

          new_user.photo = new_user.photo.slice(0, -6) // trim ?sz=50 from photo url
          db.collection('users').doc(new_user.id)
          .set(new_user)
          .then(()=>{

            db.collection('friends').doc(new_user.id)
            .set(friends)
            .then(()=>{

              db.collection('fcm').doc(new_user.id)
              .set(fcm)
              .then(()=>{
                console.log('added to database') // not really needed :rolling-eyes-emoji
                done(null, new_user)
              })
            })
          })
        } else{
          console.log('user exists');
          done(null, user.data())
        }
      })
  })
)
