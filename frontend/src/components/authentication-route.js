import React, { useState, useContext, useEffect } from 'react'
import { Route, Router } from 'react-router-dom'
import SignUpComponent from './signup'
import AuthorizationRoute from './authorization'
import AuthenticationContextProvider, { AuthenticationContext } from '../contexts/authentication-context'

const AuthenticationRoute = ({component: Component, ...parentProps}) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const { Authenticated } = useContext(AuthenticationContext)

	useEffect(() =>{
    setIsAuthenticated(Authenticated)
  }, [Authenticated])

  return (
		<Route 
		{...parentProps}
		render = { (props) => (
			isAuthenticated ?
				<Component {...props} />
			:
			<SignUpComponent />
		)}
		/>
  )
}

export default AuthenticationRoute