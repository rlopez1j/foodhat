import React, { useState, useContext, useEffect } from 'react'
import { Route } from 'react-router-dom'
import CreateUsernameComponent from '../app/create-username'
import { AuthorizationContext } from '../contexts/authorization-context'

const AuthorizationRoute = ({component: Component, ...parentProps}) => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const { Authorized } = useContext(AuthorizationContext)

  useEffect(() => {
   setIsAuthorized(Authorized)
  }, [Authorized])
  
  console.log('authz', parentProps)
  console.log('authz cx',  isAuthorized)

  return (
    <Route 
    {...parentProps}
    render = { (props) => (
      isAuthorized ?
      <Component {...props}/>
      :
      <CreateUsernameComponent />
    )}
    />
  )
}
export default AuthorizationRoute