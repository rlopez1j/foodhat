import React, { createContext, useState, useEffect } from 'react'
import AuthService from '../services/auth-service'

export const AuthenticationContext = createContext()

const AuthenticationContextProvider = (props) => {
  const [Authenticated, setAuthenticated] = useState(false)

  const checkAuthentication = async () => {
    console.log('ctx is runnning')
    let jwtToken = localStorage.getItem('token')

    if(jwtToken) {
      let authenticated = await AuthService.authenticated(jwtToken)
      setAuthenticated(authenticated)
    } else {
      setAuthenticated(false)
    }
  }

  useEffect( () =>{
    checkAuthentication()
  }, [])

  return(
    <AuthenticationContext.Provider value={{Authenticated}}>
      {props.children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationContextProvider