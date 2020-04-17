class HatLobby {


    constructor(){
        this.id = null
        this.userListId = null
        this.isActive = null
    }

    createLobby(lobby) {
        this.id = lobby.id
        this.isActive = lobby.isActive
        this.userListId = lobby.userListId
    }
}

module.exports = HatLobby