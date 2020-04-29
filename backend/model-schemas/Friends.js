const mongoose = require('mongoose')
 const FriendsSchema = mongoose.Schema({
     userId: {type: mongoose.Schema.Types.ObjectId, require: true},
     friendsList: {type: Array, default: []},
     friendRequests: {type: Array, default: []},
     pendingRequests: {type: Array, default: []}
 })

 module.exports = mongoose.model('FriendsModel', FriendsSchema)