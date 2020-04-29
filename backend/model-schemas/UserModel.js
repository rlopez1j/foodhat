const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    googleProfileId: {type: String, require: true}, 
    username: {type: String, require: true},
    displayName: {type: String, require: true},
    avi: {type: String, default: 'https://simpleicon.com/wp-content/uploads/user1.png'}, // will change this later
    friendDataId: {type: String},
    fcmToken: {type: String, default: null}
})

module.exports = mongoose.model('UserModel', UserSchema)