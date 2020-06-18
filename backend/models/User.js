class User {
    constructor(user){
        this._id = user._id
        this.displayName = user.displayName
        this.username = user.username
        this.avi = user.avi
    }
}

module.exports = User