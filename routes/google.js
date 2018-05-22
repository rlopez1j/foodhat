const router = require('express').Router()
const passport = require('passport') // don't need this yet

// log in with google
router.get('/oauth', passport.authenticate('google', {scope: ['profile', 'email']}))

// this will log out users
router.get('/logout', (req, res)=>{
  res.send('logged out')
})

/* this handles the callback function from google.
   tells router what to do once a user is already authenticated */
router.get('/redirect', passport.authenticate('google'), (req, res)=>{
    res.redirect('http://localhost:4200')
  // }
})

module.exports = router
