import React, { createContext, useState, useEffect } from 'react'
import AuthService from '../services/auth-service'
import JWTService from '../services/jwt-service'

export const AuthenticationContext = createContext()

const AuthenticationContextProvider = (props) => {
  const [Authenticated, setAuthenticated] = useState(false)
  const [User, setUser] = useState(null)

  const checkAuthentication = async () => {
    
    const existingToken = JWTService.existingToken()
    if(existingToken) {
      const jwtToken = await JWTService.getToken()
      let authenticated = await AuthService.authenticated(jwtToken)
      setAuthenticated(authenticated)
    } else {
      setAuthenticated(false)
    }
  }

  const changeAuthentication = () => setAuthenticated(true)
  const updateUser = (user) => setUser(user)

  useEffect( () =>{
    checkAuthentication()
  }, [])

  return(
    <AuthenticationContext.Provider value={{
      Authenticated,
      changeAuthentication,
      User,
      updateUser
      }}>
      {props.children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationContextProvider