const router = require('express').Router()
const db = require('../firebase')

/* this middlware function checks if there is an active session
   if req.user is empty, then there is no active session and
   the function will send a json object to communicate that w front-end */
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
  db.collection('users').where('username', '==', req.query.username)
  .get().then(username =>{
    if(username._size == 0){ // if the size of query result is 0 then username is not in db
      res.send({avaiable: true})
    } else{
      res.send({avaiable: false})
    }
  }).catch(err =>{
    console.log('error: ', err)
  })
})

router.post('/create-username', (req, res)=>{
  user = req.user.data() // gets user data from the session cookie

  db.collection('users').doc(user.email).update({username: req.body.username})
  .then(result =>{
    if(result){ // if result is null, then database was not updated
      res.send({success: true}) // json coomunicate w front-end
    }
  }).catch(err =>{ // hopefully this code will never run
    console.log('error: ', err)
    res.send({success: false})
  })
})

module.exports = router
