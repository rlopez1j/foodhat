const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

// // check login LogInStatus
// router.get('/signin-status', (req, res)=>{
//   if(req.user){
//     res.send(true)
//   } else{
//     res.send(false)
//   }
// })

// log in with google
router.get('/oauth',
  passport.authenticate('google', {
    session: false, scope: ['profile']
  })
)

// this will log out users
router.get('/logout', (req, res)=>{
  req.logout()
  req.session = null
  res.redirect(`${process.env.FRONTEND_URL}/signup`)
})

/* this handles the callback function from google.
   tells router what to do once a user is already authenticated
*/
router.get('/google-redirect',
  passport.authenticate('google', {
    failureRedirect: '/signup',
    session: false
  }),
  (req, res)=>{
    console.log('req', req.user)
    const jwtToken = jwt.sign({ user: req.user }, process.env.JWT_SECRET, {expiresIn: 60*10})
    res.json(jwtToken)
})

module.exports = router
