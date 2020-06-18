import React from 'react'
import HomeComponent from './home'
import AuthenticationRoute from '../routes/authentication-route'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AuthenticationContextProvider from '../contexts/authentication-context'
import CreateUsernameContainer from './create-username/create-username-container'

const AppContainer = () => {   
  return (
    <AuthenticationContextProvider>
        <Router>
          <div>
            <AuthenticationRoute exact path='/' component={HomeComponent}/>
            {/* this route is temporary */}
            <Route path='/create-u' component={CreateUsernameContainer} />  
            {/* this route is temporary */}
          </div>
        </Router>
    </AuthenticationContextProvider>
  )
}

export default AppContainer