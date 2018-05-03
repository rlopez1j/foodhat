router = require('express').Router()
const db = require('../firebase')

router.get('/check-username', (req, res)=>{
  console.log(req.query.username)
  u = db.collection('users').where('username', '==', req.query.username)
  .get().then(username =>{
    console.log(username);
    if(username.exists){
      console.log('user exists!');
    } else{
      console.log('user doesn\'t exist!');
    }
  })
  console.log(u)
  res.send('contacted')
})

module.exports = router
