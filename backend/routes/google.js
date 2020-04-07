const router = require('express').Router()
const passport = require('passport') // don't need this yet

// check login LogInStatus
router.get('/signin-status', (req, res)=>{
  if(req.user){
    res.send(true)
  } else{
    res.send(false)
  }
})

// log in with google
router.get('/oauth', passport.authenticate('google', {scope: ['profile']}))

// this will log out users
router.get('/logout', (req, res)=>{
  req.logout()
  req.session = null
  res.redirect('http://localhost:4200/signup')
})

/* this handles the callback function from google.
   tells router what to do once a user is already authenticated

   once authenticated, the our checks if the account has been completed
   including createing a username. it then sends a response to the client
   with information on whether the account has been throroughly completed
*/
router.get('/redirect', passport.authenticate('google'), (req, res)=>{
  if(req.user.username){
    res.redirect('http://localhost:4200/')
  }else{
    res.redirect('http://localhost:4200/create-username')
  }
})

module.exports = router
