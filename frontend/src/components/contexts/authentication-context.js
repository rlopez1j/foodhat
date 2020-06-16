import React, { createContext, useState, useEffect } from 'react'
import AuthService from '../../services/auth-service'
import JWTService from '../../services/jwt-service'

export const AuthenticationContext = createContext()

const AuthenticationContextProvider = ({children}) => {
  const [user, setUser] = useState(null)

  const checkAuthentication = async () => {
    const jwtToken = await JWTService.getToken()
    const returnedUser = await AuthService.authenticated(jwtToken)
    setUser(returnedUser)
  }

  const login = async ({ tokenId }) => {
    const userData = await AuthService.login(tokenId)
    setUser(userData)
  }

  useEffect( () =>{
    checkAuthentication()
  }, [])

  return(
    <AuthenticationContext.Provider value={{
      authenticated: !!user,
      User: user,
      login
    }}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationContextProvider