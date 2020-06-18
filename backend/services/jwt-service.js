const jwt = require('jsonwebtoken')

module.exports = {
  verifyToken: async (bearerHeader, tokenSecret) => {
    if(typeof bearerHeader !== 'undefined'){
      const splitHeader = bearerHeader.split(' ')
      const token = splitHeader[splitHeader.length-1]
      let jwtResponse

      jwt.verify(token, tokenSecret, (err, data) => {
        if(err){
          //console.log('err', err)
          jwtResponse =  null
        } else {
          jwtResponse = data.payload
        }
      })

      return jwtResponse
    } else {
      return {valid: false, user: null}
    }
  },

  setNewToken: (payload, tokenSecret, tokenExpiry) => {
    return jwt.sign({payload: payload}, tokenSecret, {expiresIn: tokenExpiry})
  }
}