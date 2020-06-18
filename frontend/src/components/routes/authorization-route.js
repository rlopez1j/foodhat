import React, { useState, useContext, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { AuthorizationContext } from '../contexts/authorization-context'
import CreateUsernameContainer from '../app/create-username/create-username-container'

const AuthorizationRoute = ({component: Component, ...parentProps}) => {
  const { authorized } = useContext(AuthorizationContext)
  
  console.log('authz props', parentProps)
  console.log('autz: ', authorized)

  return (
    <Route 
    {...parentProps}
    render = { (props) => (
      authorized ?
      <Component {...props}/>
      :
      <CreateUsernameContainer />
    )}
    />
  )
}
export default AuthorizationRoute