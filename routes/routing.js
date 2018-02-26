var express = require('express')
var router = express.Router()

/*
   This will handle all routing in the webapp
   Will create routes for CRUD and for 404
   This will handle some mongodb stuff too
*/

router.get('/', function(req, res){
  res.send('home')
})
router.get('*', function(req, res){
  res.status(404).send('page not found!')
})

module.exports = router;
