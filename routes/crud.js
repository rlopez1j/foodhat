const router = require('express').Router()
const db = require('../firebase')
const firebase = require('../local-firebase-api')

/* this middlware function checks if there is an active session
   if req.user is empty, then there is no active session and
   the function will send a json object to communicate that w front-end

   // TODO: remove this as a middlware function and
            make it its own GET request instead
   */
const LogInStatus = (req, res, next) =>{
  if(!req.user){
    console.log('logged out') // for debugging
    res.send({signedOut: true})
  } else{
    next()
  }
}

router.get('/profile', LogInStatus, (req, res)=>{
  console.log('logged in') // for debugging
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
  res.send(firebase.getHistory(req.user.data().username))
  firebase.getHistory(req.user.data().username).then((history)=>{
    res.send(history)
  }, (err)=>{
    console.log(err)
  })
})

router.get('/get-friends-list', (req, res)=>{
  firebase.getFriendsDetails(/*req.user.data().email*/ req.query.email).then((friends_details)=>{
    res.send(friends_details)
  }, (err)=>{
    console.log(err)
  })

})

router.post('/create-username', (req, res)=>{ // maybe change name of route
  firebase.modifyUsername(req.user.data().email, req.body.username).then((modified)=>{
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
