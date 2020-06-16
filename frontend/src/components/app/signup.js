import React, { useContext } from 'react'
import GoogleLogin from 'react-google-login'
import { AuthenticationContext } from '../contexts/authentication-context'

const SignUpComponent = () => {
  const { login } = useContext(AuthenticationContext)

  const fail = (response) => {
    console.log(response)
  }

  return (
      <GoogleLogin
        clientId={process.env.GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={login}
        onFailure={fail}
      />
  )
} 

export default SignUpComponent