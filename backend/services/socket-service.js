//const socket = require('socket.io')
const redis = require('redis')
const Room = require('../models/Room')
const { v4: uuidv4 } = require('uuid')
const User = require('../models/User')

class SocketIOService {
    constructor(io, socket) {
        this.io = io
        this.socket = socket
        this.redisClient = redis.createClient(process.env.REDIS_PORT)
    }
    // will create hat for the first time
    createHat(user) {
        let newUser = new User(user)
        let room = new Room()

        room.id = uuidv4()
        room.userListId = uuidv4()
        room.isActive = false

        console.log('stuff', room, newUser)
        this.io.to(this.socket.id).emit('hello', 'hello there!') // TEST
        this.redisClient.set(room.id, JSON.stringify(room))
    }
    // will add a user to the hat, and update values where relevant
    addUserToHat(){}

}

module.exports = SocketIOService