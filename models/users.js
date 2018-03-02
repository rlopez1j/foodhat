const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
  a lot of the stuff that will go in here will depend
  on how Passport handles users
*/

// create user model
const userSchema = new Schema({
  id: {
    type: Number
    required:true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
  friends: [Number]
});

const User = mongoose.model('user', userSchema);
module.exports = User;
