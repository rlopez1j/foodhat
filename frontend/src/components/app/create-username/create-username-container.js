import React, { useContext, useState } from 'react'
import { AuthorizationContext } from '../../contexts/authorization-context'
import UserService from '../../../services/user-service'
import AuthService from '../../../services/auth-service'
import CreateUserNameComponent from './create-username'

const CreateUsernameContainer = () => {
  //const { authorize } = useContext(AuthorizationContext)
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false) // need to see how to implement this part
  const [validUsername, setValidUsername] = useState(null)

  const checkUsernameAvailability = async ( username ) =>{
    const available = await UserService.checkUsernameAvailability(username)

    /* for both nests: what else??
    * might not need two states (usetIsUsernameavailable, setValidUSername)? 
    *   could just send !!username type thing like last time
    *   since they are couple anyway
    */

    if(available){
      setIsUsernameAvailable(true)
      setValidUsername(username)
    } else {
      setIsUsernameAvailable(true)
      setValidUsername(null)
    }
  }

  const setUsername = async () => {
    await AuthService.createUsername(validUsername)
    
    /* what do i do with the child component after this?
    * i can maybe use availableusername state and destory child?
    * maybe just straight redirect?
    */
  }

  return (
    <CreateUserNameComponent 
      availableUsername={isUsernameAvailable}
      checkUsernameAvailability={checkUsernameAvailability}
      setUserame={setUsername}
    />
  )
}

export default CreateUsernameContainer