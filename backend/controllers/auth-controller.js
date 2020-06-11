const router = require('express').Router()
const passport = require('passport')
const {OAuth2Client: OAuth2Client} = require('google-auth-library')
const JWTService = require('../services/jwt-service')
const MongooseService = require('../services/mongoose-service')

const verifyRefreshToken = async (req, res, next) => {
  let refreshToken = req.cookies['REFRESH_TOKEN']
  let jwt = await JWTService.verifyToken(refreshToken, process.env.JWT_REFRSH_SECRET)

  if(jwt.valid){
    req.user = jwt.user
    next()
  } else {
    res.sendStatus(401)
  }
}

const setNewTokens = (req, res) => {
  const accessToken = JWTService.setNewToken(req.user, process.env.JWT_ACCESS_SECRET, '3m')
  const refreshToken = JWTService.setNewToken(req.user, process.env.JWT_REFRSH_SECRET, '10d')

  res.cookie('REFRESH_TOKEN', refreshToken, { httpOnly: true, maxAge: 1_123_000_000 })
  res.send({accessToken: accessToken})
}

router.get('/check-authentication', async (req, res) => {
  console.log('checking authentication')
  jwt = await JWTService.verifyToken(req.headers['authorization'], process.env.JWT_ACCESS_SECRET)

  if(jwt.valid){
    res.send({authenticated: true})
  } else {
    res.send({authenticated: false})
  }
})

// this logs out users
router.get('/logout', (req, res)=>{
  // work in progress
  req.logout()
  res.redirect(`${process.env.FRONTEND_URL}/signup`)
})

router.post('/login', async (req, res) => {
  const googleToken = req.headers['authorization']
  console.log('g token', googleToken)

  if(typeof googleToken === 'undefined'){
    res.status(401)
  }

  const oAuthClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
  const ticket = await oAuthClient.verifyIdToken({
    idToken: googleToken,
    audience: process.env.GOOGLE_CLIENT_ID
  })
  .catch(err => console.log('Error! ', err))

  const googleId = ticket.getUserId()
  let user = await MongooseService.findUserByGoogleId(googleId)

  if(!user){
    const googleProfile = ticket.getPayload()
    user = await MongooseService.createNewUser({
      googleProfileId: googleId,
      username: null,
      displayName: googleProfile.given_name,
      avi: googleProfile.picture
    })
  }

  const refreshToken = JWTService.setNewToken(req.user, process.env.JWT_REFRSH_SECRET, '10d')
  const accessToken = JWTService.setNewToken(req.user, process.env.JWT_ACCESS_SECRET, '3m')

  console.log('refresh token', refreshToken)

  const response = {
    userData: user,
    jwtToken: accessToken
  }

  res.cookie('REFRESH_TOKEN', refreshToken, { httpOnly: true, maxAge: 1_123_000_000, path: '/' })
  res.send(response)
})

router.post('/refresh-token', verifyRefreshToken, (req, res) => {
  setNewTokens(req, res)
})

module.exports = router
