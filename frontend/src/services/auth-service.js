import HttpService from "./http-service"

const AuthService = {
  authenticated: async (jwtToken) => {
    // check token expiry here
    let response = await HttpService.get('/check-authentication', jwtToken)
    return response
  },
  authorized: (user) => {},
  createUsername: async () => {},
  logout: async (jwtToken) => {},
}

export default AuthService