const router = require('express').Router()
const passport = require('passport') // don't need this yet

router.post('/oauth/', (req, res)=>{
  /*
    this will eventually contain Passport.js stuff that will add users
  */
  res.send('api works')
})

module.exports = router;
