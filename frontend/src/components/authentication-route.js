import React, { useState, useContext, useEffect } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import SignUpComponent from './signup'
import AuthorizationRoute from './authorization-route'
import { AuthenticationContext } from '../contexts/authentication-context'
import AuthorizationContextProvider from '../contexts/authorization-context'
import AuthService from '../services/auth-service'

const AuthenticationRoute = ({component: Component, ...parentProps}) => {
//	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const { Authenticated, changeAuthentication, updateUser } = useContext(AuthenticationContext)

	// useEffect(() =>{
  //   setIsAuthenticated(Authenticated)
	// }, [Authenticated])
	
	const login = async (googleToken) => {
		let {userData, jwtToken} = await AuthService.login(googleToken)

		if(userData !== null){
			localStorage.setItem('token', jwtToken)
			updateUser(userData)
			changeAuthentication()
		}
	}

  return (
		<Route 
		{...parentProps}
		render = { (props) => (
			Authenticated ?
				<AuthorizationContextProvider>
					<Router>
						<div>
							<AuthorizationRoute path={parentProps.path} component={Component} />
						</div>
					</Router>
				</AuthorizationContextProvider>
			:
			<SignUpComponent login={login}/>
		)}
		/>
  )
}

export default AuthenticationRoute