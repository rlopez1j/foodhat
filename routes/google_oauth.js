const router = require('express').Router()
const passport = require('passport') // don't need this yet

// log in with google
router.get('/oauth', passport.authenticate('google', {scope: ['profile']}))

// this will log out users
router.get('/logout', (req, red)=>{
  res.send('logged out')
})

module.exports = router;
