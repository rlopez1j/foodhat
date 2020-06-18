import React, { useContext } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import SignUpComponent from '../app/signup'
import AuthorizationRoute from '../routes/authorization-route'
import { AuthenticationContext } from '../contexts/authentication-context'
import AuthorizationContextProvider from '../contexts/authorization-context'

const AuthenticationRoute = ({component: Component, ...parentProps}) => {
	const { authenticated } = useContext(AuthenticationContext)

  return (
		<Route 
		{...parentProps}
		render = { (props) => (
			authenticated ?
				<AuthorizationContextProvider>
					<Router>
						<div>
							<AuthorizationRoute path={parentProps.path} component={Component} />
						</div>
					</Router>
				</AuthorizationContextProvider>
			:
			<SignUpComponent/>
		)}
		/>
  )
}

export default AuthenticationRoute