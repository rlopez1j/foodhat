const mongoose = require('mongoose')
const UserModel = require('../model-schemas/UserModel')
const FriendsModel = require('../model-schemas/FriendsModel')
const User = require('../models/User')

module.exports = {
    findUserByGoogleId: async (gId) => {
        const userReturned = await UserModel.findOne({ googleProfileId: gId})
                .catch(err => console.log('Error!', err))
        return new User(userReturned)
    },

    createNewUser: async (user) => {
        const newUser = new UserModel(user)
        await newUser.save()

        await new FriendsModel({ userId: newUser._id }).save()
        return new User(newUser.toObject())
    },

    findUserById: async (id) => {
        const userReturned = await UserModel.findOne({ _id: id})
            .catch(err => console.log('Error!', err))
        return new User(userReturned)
    },

    checkUsernameAvailability: async (username) => {
        if(username === '') return false
        let result = await UserModel.findOne({username: username})
            .catch(err => console.log('Error!', err))
        return result === null ? true : false
    },

    searchUser: async (userToSearch) => {
        if(userToSearch === '') return []
        let result = await UserModel.find({
            username: {'$regex': userToSearch, '$options': 'i'}
        }).catch(err => console.log('Error!', err))
        return result.map(u => new User(u))
    },

    setUsername: async (userId, usernameToSet) => {
        const user = await UserModel.findOne({_id: userId})
            .catch(err => console.log('Error!', err))
        user.username = usernameToSet
        await user.save()
        return user.username
    }
}