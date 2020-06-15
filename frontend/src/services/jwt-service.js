import JwtDecode from 'jwt-decode'
import HttpService from './http-service'

const JWTService = {
  getToken: async () => {
    let jwtToken = localStorage.getItem('token')
    const tokenExpiry = JwtDecode(jwtToken).exp
    // have to turn it to epoch seconds bc that's the format jwt exp sends
    const currentTime = Math.floor(Date.now() / 1000) 

    if(tokenExpiry < currentTime){
      // refresh tokens
      let header = {'Access-Control-Allow-Origin': '*'}
      let { accessToken } = await HttpService.post('auth/refresh-token', {headers: header, credentials: true})
      jwtToken = accessToken
      //localStorage.setItem('token', jwtToken)
    }

    return jwtToken
  },
  existingToken: () => {
    const token = localStorage.getItem('token')
    return !(token === null)
  }
}

export default JWTService