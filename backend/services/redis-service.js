const redis = require('redis')
const Hat = require('../models/Hat')
const User = require('../models/User')
const {promisify: promisify} = require('util')

class RedisService {
    constructor(){
        this.redisClient = redis.createClient(process.env.REDIS_PORT)
    }

    async getUserListByHatId(id){
        let getAsync = promisify(this.redisClient.get).bind(this.redisClient)
        
        let redisResponse = await getAsync(id)
        let hat = new Hat(JSON.parse(redisResponse))
        
        return hat.userListId
    }
    
    async getUsersInHat(userListId){
        let gethallAsync = promisify(this.redisClient.hgetall).bind(this.redisClient)
        let redisResults = await gethallAsync(userListId)
        return Object.keys(redisResults).map(key => new User(JSON.parse(redisResults[key])))
    }

    async addToUserList(userListId, key, user){ 
        let hgetAsync = promisify(this.redisClient.hget).bind(this.redisClient)

        let userInHat = await hgetAsync(userListId, key).catch(err => console.log('Error!', err))

        if(userInHat) return false
        
        this.redisClient.hset(userListId, key, user)
        return true
    }

    createHat(hatKey, hatData){
        this.redisClient.set(hatKey, hatData)
    }
}

module.exports = RedisService