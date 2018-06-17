const router = require('express').Router()
const db = require('../firebase')
const firebase = require('../local-firebase-api')

router.get('/profile', (req, res)=>{
  console.log('user session data requested') // for debugging
  res.send(req.user.data()) // sends the data from the cookie session
})

router.get('/check-username', (req, res)=>{
  firebase.isUsernameAvailable(req.query.username)
  .then((avaiable)=>{
    if(avaiable){
      res.send({avaiable: true})
    } else{
      res.send({avaiable: false})
    }
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
  firebase.getFriendsDetails(/*req.user.data().email*/ req.query.email)
  .then((friends_details)=>{
    res.send(friends_details)
  }, (err)=>{
    console.log(err)
  })

})

router.post('/create-username', (req, res)=>{ // maybe change name of route
  firebase.modifyUsername(req.user.data().email, req.body.username)
  .then((modified)=>{
    if(modified){
      res.send({success: true})
    } else{
      res.send({success: false}) // hopefully this is never sent
    }
  }, (err)=>{
    console.log(err)
  })
})

module.exports = router
