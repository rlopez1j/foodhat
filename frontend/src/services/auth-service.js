import HttpService from "./http-service"
import JWTService from "./jwt-service"

const AuthService = {
  authenticated: async (jwtToken) => {
    let header = { 'Authorization': jwtToken }
    const response = await HttpService.get('auth/check-authentication', {headers: header})

    if(response !== null){
      return ({response}) => ({...response}) 
    } else {
      return {authenticated: null, user: null}
    }
  },
  login: async (googleToken) => {
    let header = { 'Authorization': googleToken }
    let response = await HttpService.post('auth/login', {headers: header, credentials: 'same-origin'})
    // add token to local storage?
    if(response !== null){ 
      return response 
    } 
    else { // will probably refactor this
      return {userData: null, jwtToken: null} 
    }
  },
  authorized: (user) => {},
  createUsername: async () => {},
  logout: async (jwtToken) => {},
}

export default AuthService