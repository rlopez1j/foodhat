import React, { useContext } from 'react'
import GoogleLogin from 'react-google-login'
import { AuthenticationContext } from '../contexts/authentication-context'

const SignUpComponent = () => {
  const { login } = useContext(AuthenticationContext)

  const successfulAuth = ({ tokenId }) => {
    console.log(tokenId)
    //const googleToken = response.tokenId
    // login(googleToken)
  }

  const fail = (response) => {
    console.log(response)
  }

  return (
      <GoogleLogin
        clientId={process.env.GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={successfulAuth}
        onFailure={fail}
      />
  )
} 

export default SignUpComponent