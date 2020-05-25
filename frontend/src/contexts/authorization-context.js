import React, { createContext, useContext, useState } from 'react'

export const AuthorizationContext = createContext()

const useAuthorization = (props) => {
  const [Authorized, setAuthorized] = useState(false)
  
  return(
    <AuthorizationContext.Provider value={{Authorized}}>
      {props.children}
    </AuthorizationContext.Provider>
  )
}

export default useAuthorization