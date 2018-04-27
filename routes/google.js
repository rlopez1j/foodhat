const router = require('express').Router()
const passport = require('passport') // don't need this yet

// log in with google
router.get('/oauth', passport.authenticate('google', {scope: ['profile', 'email']}))

// this will log out users
router.get('/logout', (req, red)=>{
  res.send('logged out')
})

router.get('/redirect', passport.authenticate('google'), (req, res)=>{
  res.redirect('http://localhost:4200/home')
  //res.send(req.user.data())
})

router.get('/profile', (req, res)=>{
  res.send(req.user.data())
})

module.exports = router;
