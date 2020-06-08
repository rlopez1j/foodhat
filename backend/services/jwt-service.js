const jwt = require('jsonwebtoken')

module.exports = {
  verifyToken: async (bearerHeader, tokenSecret) => {
    if(typeof bearerHeader !== 'undefined'){
      let token = bearerHeader.split(' ')[1]
      let jwtResponse

      jwt.verify(token, tokenSecret, (err, data) => {
        if(err){
          jwtResponse =  {valid: false, user: null}
        } else {
          jwtResponse = {valid: true, user: data.user}
        }
      })

      return jwtResponse
    } else {
      return {valid: false, user: null}
    }
  },

  setNewToken: (user, tokenSecret, tokenExpiry) => {
    return jwt.sign({user: user}, tokenSecret, {expiresIn: tokenExpiry})
  }
}