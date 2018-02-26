var express = require('express')
var router = express.Router()
/*
  this contains landing pages that wont ask for user input, etc
*/
router.get('/about', (req, res) =>{
  // this and the latter res.sends will render pages
  res.send('food hat is a webapp')
})
router.get('/contact', (req, res) =>{
  res.send('hit us up @deathvoxxxx')
})
router.get('*', (req, res)=>{
  res.status(404).send('page not found!')
})
module.exports = router
