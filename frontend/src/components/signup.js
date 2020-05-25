import React, { useContext } from 'react'
import { AuthenticationContext } from '../contexts/authentication-context'

const SignUpComponent = () => {
  const { login } = useContext(AuthenticationContext)

  return (
    <div>
      <button onClick={login}>
        google
      </button>
    </div>
  )
}

export default SignUpComponent