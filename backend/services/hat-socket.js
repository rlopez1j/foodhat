const socket = require('socket.io')
const User = require('../models/User')
const redisAdapter = require('socket.io-redis')
const socketIOService = require('./socket-service')

module.exports = function(app){
  const io = socket(app)
  io.adapter(redisAdapter({host: process.env.HOST, port: process.env.REDIS_PORT}))

  io.on('connection', (socket) =>{
    console.log('made socket connection', socket.id);
    console.log('number of connections', io.engine.clientsCount)
    const socketService = new socketIOService(io, socket)

    socket.on('createNewHat', (user) => {
      let newUser = new User(user)
      socketService.createHat(newUser)
    })

    socket.on('addUserToHat', (user, {roomId}) => {
      user = new User(user)
      socketService.addUserToHat(user, roomId)
    })

  	socket.on('addRestaurantToHat', (restaurant)=>{
      // hardcored user obj is temporary. i will get user with jwt token in the future
      let user = new User({
        displayName: 'Roman',
        username: 'rlopez',
        avi: 'url'
      })
      socketService.addRestaurantToHat(restaurant, user)
  	})

  	// removes the user from the socket.io connection
  	socket.on('disconnecting', ()=>{
      // hardcored user obj is temporary. i will get user with jwt token in the future
      let user = {
        displayName: 'Roman',
        username: 'rlopez',
        avi: 'url'
      }
      socketService.disconnectUser(user)
    })

    socket.on('disconnect', ()=>{
      console.log('number of connections', io.engine.clientsCount)
    })
  })

  return io
}
