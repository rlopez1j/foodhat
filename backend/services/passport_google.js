const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const MongooseService = require('mongoose-service')

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
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/google/redirect'
  },
  (accessToken, refreshToken, profile, done) => {
    const mongooseService = new MongooseService()

    const userReturned = await mongooseService.findUserByGoogleId(profile.id)
    if(!userReturned){
      const newUser = await mongooseService.createNewUser({
        googleProfileId: profile.id,
        username: null,
        displayName: profile.name.givenName,
        avi: profile.photos[0].value
      })

      done(null, newUser)
    } else {
      console.log(userReturned)
    }

    // // check if user exists
      // db.collection('users').doc(profile.id)
      // .get()
      // .then(user =>{

      //   if(!user.exists){
      //     new_user = { // may put in diff file if i need it in other places
      //       id: profile.id,
      //       username: null,
      //       name: profile.name.givenName,
      //       photo: profile.photos[0].value,
      //       search: []
      //     }

      //     friends = {
      //       friend_requests: [],
      //       friends_list: [],
      //       pending_requests: []
      //     }

      //     fcm = {
      //       fcm_token: null
      //     }

      //     new_user.photo = new_user.photo.slice(0, -6) // trim ?sz=50 from photo url
      //     db.collection('users').doc(new_user.id)
      //     .set(new_user)
      //     .then(()=>{

      //       db.collection('friends').doc(new_user.id)
      //       .set(friends)
      //       .then(()=>{

      //         db.collection('fcm').doc(new_user.id)
      //         .set(fcm)
      //         .then(()=>{
      //           console.log('added to database') // not really needed :rolling-eyes-emoji
      //           done(null, new_user)
      //         })
      //       })
      //     })
      //   } else{
      //     console.log('user exists');
      //     done(null, user.data())
      //   }
      //})
  })
)
