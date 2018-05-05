const router = require('express').Router()
const db = require('../firebase')
const bodyParse = require('body-parser')

const LogInStatus = (req, res, next) =>{
  if(!req.user){
    res.send({signedOut: true})
  } else{
    next()
  }
}

router.get('/profile', LogInStatus, (req, res)=>{
  res.send(req.user.data())
})

router.get('/check-username', (req, res)=>{
  db.collection('users').where('username', '==', req.query.username)
  .get().then(username =>{
    if(username._size == 0){ // checks the size of the query results
      res.send({avaiable: true})
    } else{
      res.send({avaiable: false})
    }
  }).catch(err =>{
    console.log('error ', err)
  })
})

module.exports = router
