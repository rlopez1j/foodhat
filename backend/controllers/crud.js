const router = require('express').Router()
const firebase = require('../services/local-firebase-api')
const notification_hander = require('../services/notifications')
const MongooseService = require('../services/mongoose-service')
const jwt = require('jsonwebtoken')
const JWTService = require('../services/jwt-service')

const verifyToken = (req, res, next) => {
  let bearerHeader = req.headers['authorization']

  [valid, user] = JWTService.verifyToken(bearerHeader, process.env.JWT_ACCESS_SECRET)

  if(valid){
    req.user = user
    next()
  } else {
    res.sendStatus(401)
  }
}

const checkUserName = (req, res, next) => {
  if(typeof req.user.username === 'undefined')
    res.send('username creation redir')
  else
    next()
}

const validateQueryParam = (req, res, next) => {
  if(Object.keys(req.query).length  === 0){
    res.sendStatus(400)
  } else {
    next()
  }
}

router.get('/profile', verifyToken, checkUserName, (req, res)=>{
  res.json('sent profile')
})

router.get('/check-for-username', verifyToken, validateQueryParam, async (req, res)=>{
    let isAvailable = await MongooseService.checkUsernameAvailability(req.query.username)
    res.json(isAvailable)
})

router.get('/get-history', (req, res)=>{
  firebase.getHistory(req.user.data().username)
  .then((history)=>{
    res.send(history)
  }, (err)=>{
    console.log(err)
  })
})

router.get('/get-friends-list', (req, res)=>{
  firebase.getFriendsDetails(req.user.data().id, req.query.id)
  .then((friends_details)=>{
    res.send(friends_details)
  }, (err)=>{
    console.log(err)
  })

})

router.put('/set-username', verifyToken, async (req, res)=>{
  let newUsername = await MongooseService.setUsername(req.user._id, req.body.username)
  req.user.username = newUsername
  // create new token with username in it
  const jwtToken = JWTService.setNewToken(user, process.env.JWT_ACCESS_SECRET, '3m')
  res.json(jwtToken)
})

router.post('/send-notification', (req, res)=>{
  notification_hander.sendNotification(req.user.data().id, req.body.receiver, req.body.options)
  .then(resp => res.send(resp))
  .catch(err => res.send(err))
})


router.get('/search', verifyToken, validateQueryParam, async (req, res)=>{
  let userResults = await MongooseService.searchUser(req.query.user)
  res.send(userResults)
})

// needs a bit more testing
router.post('/send-request', (req, res)=>{
  firebase.sendFriendRequest(req.user.data().id, req.body.requested)
  notification_hander.sendNotification(sender, requested, {notif_type: 'friend-request'})
})

router.post('/accept-request', (req, res)=>{
  // firebase local api that makes db changes
  firebase.acceptFriendRequest(req.user.data().id, req.body.user_accepted)
  notifications.sendNotification(user_accepted, user, {notif_type: 'request-accepted'})
})

router.post('/reject-request', (req, res)=>{
  // firebase local api that makes db changes
  firebase.rejectFriendRequest(req.user.data().id, req.body.user_rejected)
})

module.exports = router