router = require('express').Router()
const db = require('../firebase')

router.get('/check-username', (req, res)=>{
  db.collection('users').where('username', '==', req.query.username)
  .get().then(username =>{
    if(username._size != 0){
      res.send({exists: true})
    } else{
      res.send({exists: false})
    }
  }).catch(err =>{
    console.log('error ', err)
  })
})

module.exports = router
