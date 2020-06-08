const router = require('express').Router()
const passport = require('passport')
const JWTService = require('../services/jwt-service')

const verifyRefreshToken = async (req, res, next) => {
  let bearerHeader = req.headers['authorization']
  [valid, user] = await JWTService.verifyToken(bearerHeader, process.env.JWT_REFRESH_SECRET)

  if(valid){
    req.user = user
    next()
  } else {
    res.sendStatus(401)
  }
}

const setNewTokens = (req, res) => {
  const accessToken = JWTService.setNewToken(req.user, process.env.JWT_ACCESS_SECRET, '3m')
  const refreshToken = JWTService.setNewToken(req.user, process.env.JWT_REFRSH_SECRET, '10d')

  res.setHeader('Set-Cookie', `refresh-token=${refreshToken}; HttpOnly`)
  res.json(accessToken)
}

router.get('/check-authentication', async (req, res) => {
  console.log('checking authentication')
  console.log('http cookie', req.headers)
  jwt = await JWTService.verifyToken(req.headers['authorization'], process.env.JWT_ACCESS_SECRET)

  if(jwt.valid){
    res.send({authenticated: true})
  } else {
    res.send({authenticated: false})
  }
})

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
    const refreshToken = JWTService.setNewToken(req.user, process.env.JWT_REFRSH_SECRET, '10d')
    const accessToken = JWTService.setNewToken(req.user, process.env.JWT_ACCESS_SECRET, '3m')


    res.setHeader('Set-Cookie', `refresh-token=${refreshToken}; HttpOnly`)
    res.redirect(`${process.env.FRONTEND_URL}/int/?token=${accessToken}`)
    
    // setNewTokens(req, res)
})

router.post('/login', (req, res) => {
  const googleToken = req.headers['authorization']
  console.log('gToken', googleToken)
  if(typeof googleToken === 'undefined'){
    res.status(401)
  }
  /**
   * 1. decode gToken
   * 2. do the same workflow done in passport config
   * 3. create jwt tokens
   * 4. send user obj & token to frontend as a response object of sorts
   *
   */
  res.json('placeholder')
})

router.post('/refresh-token', verifyRefreshToken, (req, res) => {
  setNewTokens(req, res)
})

module.exports = router
