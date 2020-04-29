const Hat = require('../models/Hat')
const { v4: uuidv4 } = require('uuid')
const RedisService = require('./redis-service')

class SocketIOService {
    constructor(io, socket) {
        this.io = io
        this.socket = socket
        this.redisService = new RedisService()
    }
    // will create hat for the first time
    createHat(user) {
        let hat = new Hat({
            id: uuidv4(),
            userListId: uuidv4(),
            isActive: false
        })

        this.redisService.createHat(hat.id, JSON.stringify(hat))
        this.addUserToHat(user, hat.id)
    }
    // will add a user to the hat, and update values where relevant
    async addUserToHat(user, hatId){
        let userListId = await this.redisService.getUserListIdByHatId(hatId)
        let userAdded = await this.redisService.addToUserList(userListId, user.username, JSON.stringify(user))
        let usersInHat = await this.redisService.getUsersInHat(userListId)
        this.socket.join(hatId)

        // might not do it this way need to think of overall app design
        if(userAdded){
            this.io.in(hatId).emit('sendHatData', usersInHat)
        } else {
            this.io.to(this.socket.id).emit('sendHatData', usersInHat)
        }
    }

    addRestaurantToHat(restaurant, user){
        let hatId = Object.keys(this.io.sockets.sockets[this.socket.id].rooms)[1]
        restaurant.user = user.displayName
        this.io.to(hatId).emit('UpdateRestaurantList', restaurant)
    }

    async disconnectUser(user){
        let hatId = Object.keys(this.io.sockets.sockets[this.socket.id].rooms)[1]

        let userListId = await this.redisService.getUserListIdByHatId(hatId)
        let usersLeft = await this.redisService.removeFromUserList(userListId, user.username)
        
        if(usersLeft.length === 0){
            this.redisService.destroyAll(hatId, userListId)
        } else {
            this.io.to(hatId).emit('sendHatData', usersLeft)
        }
    }
}

module.exports = SocketIOService