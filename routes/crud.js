const router = require('express').Router()
const request = require('request')
const db = require('../firebase')
const firebase = require('../local-firebase-api')
const notification_hander = require('../notifications')

router.get('/profile', (req, res)=>{
  console.log('user session data requested') // for debugging
  res.send(req.user.data()) // sends the data from the cookie session
})

router.get('/check-username', (req, res)=>{
  firebase.isUsernameAvailable(req.query.username)
  .then((avaiable)=>{
    res.send({avaiable: avaiable})
  }, (err)=>{
    console.log(err)
  })
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
  firebase.getFriendsDetails(/*req.user.data().id*/ req.query.id)
  .then((friends_details)=>{
    res.send(friends_details)
  }, (err)=>{
    console.log(err)
  })

})

router.post('/create-username', (req, res)=>{ // maybe change name of route
  firebase.modifyUsername(req.user.data().id, req.body.username)
  .then((modified)=>{
    res.send({success: modified})
  }, (err)=>{
    console.log(err)
  })
})

router.post('/send-notification', (req, res)=>{
  notification_hander.sendNotification(req.user.data().id, req.body.receiver, req.body.room )
  .then(resp => res.send(resp))
  .catch(err => res.send(err))
})

router.post('/send-request', (req, res)=>{
  firebase.sendFriendRequest(req.user.data().id, req.body.requested)
  .then((req_sent)=>{
    res.send({sent: req_sent})
  }, (err)=>{
    console.log(err)
  })
})

router.post('/accept_request', (req, res)=>{
  // firebase local api that makes db changes
  firebase.acceptFriendRequest(req.user.data().id, req.body.user_accepted)
})

router.post('/reject_request', (req, res)=>{
  // firebase local api that makes db changes
})

module.exports = router
