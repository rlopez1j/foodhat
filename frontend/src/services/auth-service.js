import HttpService from "./http-service"
import JWTService from "./jwt-service"

const AuthService = {
  authenticated: async (jwtToken) => {
    let header = { 'Authorization': jwtToken }
    let { authenticated } = await HttpService.get('auth/check-authentication', {headers: header})
    return authenticated
  },
  login: async (googleToken) => {
    let header = { 'Authorization': googleToken }
    let response = await HttpService.post('auth/login', {headers: header, credentials: 'same-origin'})
    // add token to local storage?
    return response // might need to mock rn
  },
  authorized: (user) => {},
  createUsername: async () => {},
  logout: async (jwtToken) => {},
}

export default AuthService