const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

const verifyRefreshToken = (req, res, next) => {
  let bearerHeader = req.headers['authorization']

  if(typeof bearerHeader !== 'undefined'){
    let token = bearerHeader.split(' ')[1]
    jwt.verify(token, process.env.JWT_REFRESH_TOKEN, (err, data) => {
      if(err){
        res.sendStatus(401)
      } else {
        req.user = data.user
        next()
      }
    })
  } else {
    res.sendStatus(401)
  }
}

const setNewTokens = (req, res) => {
  console.log('req', req.user)
  const accessToken = jwt.sign({ user: req.user }, process.env.JWT_ACCESS_SECRET, {expiresIn: '3m'})
  const refreshToken = jwt.sign({user: req.user}, process.env.JWT_REFRESH_TOKEN, {expiresIn: '10d'})
  res.setHeader('Set-Cookie', `refresh-token=${refreshToken}; HttpOnly`)
  res.json(accessToken)
}

// log in with google
router.get('/oauth',
  passport.authenticate('google', {
    session: false, scope: ['profile']
  })
)

// this logs out users
router.get('/logout', (req, res)=>{
  // work in progress
  req.logout()
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
    setNewTokens(req, res)
})

router.post('/refresh-token', verifyRefreshToken, (req, res) => {
  setNewTokens(req, res)
})

module.exports = router
