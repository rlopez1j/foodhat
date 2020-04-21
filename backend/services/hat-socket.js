const socket = require('socket.io')
const randomstring = require('randomstring')
const redis = require('redis')
const redisAdapter = require('socket.io-redis')
const socketIOService = require('./socket-service')
// TODO: update the data struct all thoughout the app
// TODO: move all socket.io code to a different file

module.exports = function(app){
  const io = socket(app)
  io.adapter(redisAdapter({host: process.env.HOST, port: process.env.REDIS_PORT}))
  // const redisClient = redis.createClient(6379)

  // socket io variables
  var rooms = new Map()

  // helper functions
  function createUserData(user){
    return user_data = {
      name: user.name,
      username: user.username,
      photo: user.photo
    }
  }

  function duplicateUserHadling(room_name, user){
    var duplicate = false
    rooms.get(room_name).forEach((current_user, key)=>{
      if(user.username == current_user.username){ // user already in lobby
          console.log('you\'re already in here!')
          rooms.get(room_name).delete(key)
          duplicate = true
          return
      }
    })
    return duplicate
  }

  // socket.io server events
  io.on('connection', (socket) =>{
    // only comes out when we have contacted the client too
    console.log('made socket connection', socket.id);
    console.log('number of connections', io.engine.clientsCount)
    console.log('rooms ', io.sockets.adapter.rooms)
    const socketService = new socketIOService(io, socket)

    socket.on('createNewHat', (user) => {
      socketService.createHat(user)
      console.log('rooms ', io.sockets.adapter.rooms)

    })

    socket.on('addUserToHat', (user, {roomId})=>{
      console.log('room', roomId)
      socketService.addUserToHat(user, roomId)
      console.log('rooms ', io.sockets.adapter.rooms)
    })

  	socket.on('add-to-hat', (restaurant, user, room_name)=>{
  		restaurant['user'] = user.name
  		socket.to(room_name).emit('update-hat', restaurant)
  	})

    /* sends client updated lobby that has the user removed.
    sends client username to remove restaurants in the hat
       added by the user that was removed.
       disconnects the current socket from socket.io.
    */
  	socket.on('disconnect-client', (room_name)=>{
      removed_user = rooms.get(room_name).get(socket.id)
      rooms.get(room_name).delete(socket.id)

      io.sockets.in(room_name).emit('remove-disconnected', removed_user.name)
  		io.sockets.in(room_name).emit('create-lobby', Array.from(rooms.get(room_name)))
      socket.disconnect(true)

      // if the room is empty, delete the room variable to save space
      if(rooms.get(room_name).size == 0){
        rooms.delete(room_name)
      }
  	})

  	// removes the user from the socket.io connection
  	socket.on('disconnect', ()=>{
  		console.log(socket.id+' has disconnected')
  	})
  })

  return io
}
