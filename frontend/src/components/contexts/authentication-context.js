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

  const login = async (googleToken) => {
		let {userData, jwtToken} = await AuthService.login(googleToken)

		if(userData !== null){ // look into refactoring this part
      localStorage.setItem('token', jwtToken)
      setUser(userData) // does this cause a new component refresh?
    }
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