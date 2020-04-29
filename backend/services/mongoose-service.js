const mongoose = require('mongoose')
const UserModel = require('../model-schemas/UserModel')
const FriendsModel = require('../model-schemas/UserModel')
const User = require('../models/User')

class MongooseService {
    constructor(){}

    async findUserByGoogleId(id){
        return await UserModel.find({ googleProfileId: id}).exec()
                .catch(err => console.log('Error!', err))
    }

    async createNewUser(user){
        const newUser = new UserModel(user)
        await newUser.save()

        await new FriendsModel({ userId: newUser._id }).save()

        return new User(newUser.toObject())
    }
    
}