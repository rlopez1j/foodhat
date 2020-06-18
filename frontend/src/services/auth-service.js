import HttpService from './http-service'
import JWTService from './jwt-service'

const AuthService = {
  authenticated: async (jwtToken) => {
    if(jwtToken !== null){
      let header = { 'Authorization': jwtToken }
      return await HttpService.get('auth/check-authentication', {headers: header})
    }
    return null
  },
  login: async (googleToken) => {
    let header = { 'Authorization': googleToken }
    let response = await HttpService.post('auth/login', {headers: header, credentials: 'same-origin'})
    
    if(response !== null){ 
      console.log('token', response.jwtToken)
      //JWTService.setToken(response.jwtToken)
    }

    return response.userData
  },
  authorized: (user) => {},
  createUsername: async () => {},
  logout: async (jwtToken) => {},
}

export default AuthService