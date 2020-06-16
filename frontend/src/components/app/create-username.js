import React, { useContext } from 'react'
import { AuthorizationContext } from '../contexts/authorization-context'

const CreateUsernameComponent = () => {
  const { authorize } = useContext(AuthorizationContext)
  return (<button onClick={authorize}>create username</button>)
}

export default CreateUsernameComponent