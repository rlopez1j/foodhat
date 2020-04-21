class Hat {
    constructor(lobby){
        if(typeof lobby == 'undefined'){
            this.id = null
            this.userListId = null
            this.isActive = null    
        } else{
            this.id = lobby.id
            this.isActive = lobby.isActive
            this.userListId = lobby.userListId    
        }
    }
}

module.exports = Hat