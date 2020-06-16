import React from 'react'
import HomeComponent from './home'
import AuthenticationRoute from '../routes/authentication-route'
import { BrowserRouter as Router } from 'react-router-dom'
import AuthenticationContextProvider from '../contexts/authentication-context'

const AppContainer = () => {   
  return (
    <AuthenticationContextProvider>
        <Router>
          <div>
            <AuthenticationRoute exact path='/' component={HomeComponent}/>
          </div>
        </Router>
    </AuthenticationContextProvider>
  )
}

export default AppContainer