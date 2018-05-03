const router = require('express').Router()
const passport = require('passport') // don't need this yet

// log in with google
router.get('/oauth', passport.authenticate('google', {scope: ['profile', 'email']}))

// this will log out users
router.get('/logout', (req, red)=>{
  res.send('logged out')
})

/* this handles the callback function from google.
   tells router what to do once a user is already authenticated */
router.get('/redirect', passport.authenticate('google'), (req, res)=>{
  // for the first time users, it will make them choose a username
  if(req.user.data().username == null/* no sure if right call */){
    res.redirect('http://localhost:4200/signup-continue')
  } else{ // if the user is completely registered take them to the homepage
    res.redirect('http://localhost:4200/home')
  }
})

router.get('/profile', (req, res)=>{
  res.send(req.user.data())
})

module.exports = router
