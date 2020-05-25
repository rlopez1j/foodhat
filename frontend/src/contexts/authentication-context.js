import React, { createContext, useState, useEffect } from 'react'

export const AuthenticationContext = createContext()

const AuthenticationContextProvider = (props) => {
  const [Authenticated, setAuthenticated] = useState(false)

  useEffect(() =>{
    setAuthenticated(false)
  }, [])

  const login = () => {
    setAuthenticated(true)
  }

  return(
    <AuthenticationContext.Provider value={{Authenticated, login}}>
      {props.children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationContextProvider