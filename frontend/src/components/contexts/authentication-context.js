import React, { createContext, useState, useEffect } from 'react'
import AuthService from '../../services/auth-service'
import JWTService from '../../services/jwt-service'

export const AuthenticationContext = createContext()

const AuthenticationContextProvider = ({children}) => {
  //const [Authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const checkAuthentication = async () => {
    
    const existingToken = JWTService.existingToken()
    if(existingToken) {
      const jwtToken = await JWTService.getToken()
      /* let authenticated =  */ await AuthService.authenticated(jwtToken)
    //  setAuthenticated(authenticated)
    } else {
      //setAuthenticated(false)
    }
  }

  //const changeAuthentication = () => setAuthenticated(true)
  const updateUser = (user) => setUser(user)

  useEffect( () =>{
    checkAuthentication()
  }, [])

  return(
    <AuthenticationContext.Provider value={{
      authenticated: !!user,
      User: user,
      updateUser
      }}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationContextProvider