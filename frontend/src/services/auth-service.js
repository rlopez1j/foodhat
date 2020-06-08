import HttpService from "./http-service"

const AuthService = {
  authenticated: async (jwtToken) => {
    // check token expiry here
    let { authenticated } = await HttpService.get('auth/check-authentication', {headers: jwtToken})
    console.log('http serv', authenticated) // 
    return authenticated
  },
  login: async (googleToken) => {
    let header = { 'Authorization': googleToken}
    let resp = await HttpService.post('auth/login', {headers: header})
    console.log('login resp', resp)
  },
  authorized: (user) => {},
  createUsername: async () => {},
  logout: async (jwtToken) => {},
}

export default AuthService