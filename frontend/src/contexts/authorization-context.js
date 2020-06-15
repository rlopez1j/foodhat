import React, { createContext, useState, useEffect } from 'react'

export const AuthorizationContext = createContext()

const AuthorizationContextProvider = (props) => {
  const [Authorized, setAuthorized] = useState(false)

  useEffect(() => {
    setAuthorized(false)
  }, [])

  const authorize = () => {
    setAuthorized(true)
  }
  
  return(
    <AuthorizationContext.Provider value={{Authorized, authorize}}>
      {props.children}
    </AuthorizationContext.Provider>
  )
}

export default AuthorizationContextProvider