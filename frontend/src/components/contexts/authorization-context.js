import React, { createContext, useState, useEffect, useContext } from 'react'
import { AuthenticationContext } from './authentication-context'

export const AuthorizationContext = createContext()

const AuthorizationContextProvider = (props) => {
  const [authorized, setAuthorized] = useState(false)
  const { user } = useContext(AuthenticationContext)

  useEffect(() => {
    if(user.username !== null){
      setAuthorized(true)
    }
  }, [user])

  const authorize = () => {
    setAuthorized(true)
  }
  
  return(
    <AuthorizationContext.Provider value={{authorized, authorize}}>
      {props.children}
    </AuthorizationContext.Provider>
  )
}

export default AuthorizationContextProvider