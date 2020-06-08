import React from 'react'
import GoogleLogin from 'react-google-login'

const SignUpComponent = ({ login }) => {

  const successfulAuth = (response) => {
    const googleToken = response.tokenId
    login(googleToken)
  }

  const fail = (response) => {
    console.log(response)
  }

  return (
      <GoogleLogin
        clientId={process.env.GOOGLE_CLIENT_ID}
        scope={'https://www.googleapis.com/auth/userinfo.profile'}
        fetchBasicProfile={false}
        buttonText="Login"
        onSuccess={successfulAuth}
        onFailure={fail}
      />
  )
} 

export default SignUpComponent