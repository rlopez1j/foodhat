//const socket = require('socket.io')
const Hat = require('../models/Hat')
const { v4: uuidv4 } = require('uuid')
const User = require('../models/User')
const RedisService = require('./redis-service')

class SocketIOService {
    constructor(io, socket) {
        this.io = io
        this.socket = socket
        this.redisService = new RedisService()
    }
    // will create hat for the first time
    createHat(user) {
        let newUser = new User(user)
        let hat = new Hat()

        hat.id = uuidv4()
        hat.userListId = uuidv4()
        hat.isActive = false

        console.log('stuff', hat)
        this.io.to(this.socket.id).emit('hello', 'hello there!') // TEST
        this.redisService.createHat(hat.id, JSON.stringify(hat))
        this.addUserToHat(newUser, hat.id)
    }
    // will add a user to the hat, and update values where relevant
    async addUserToHat(user, hatId){
        let userListId = await this.redisService.getUserListByHatId(hatId)
        console.log('list id', userListId)
        let userAdded = await this.redisService.addToUserList(userListId, user.username, JSON.stringify(user))
        let usersInHat = await this.redisService.getUsersInHat(userListId)
        this.socket.join(hatId)

        // might not do it this way need to think of overall app design
        if(userAdded){
            this.io.in(hatId).emit('send-hat-data', usersInHat)
        } else {
            this.io.to(this.socket.id).emit('send-hat-data', usersInHat)
        }
    }

}

module.exports = SocketIOService