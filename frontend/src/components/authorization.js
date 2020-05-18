import React from 'react'
import CreateUsernameComponent from './create-username'

const AuthorizationComponent = ({ User, authorizeUser }) => {
  const [CompletedProfile, setCompletedProfile] = useState(false)
  const [userData, setuserData] = useState(null)

  const checkProfileCompletion = (user) => {
    if(user.username === null) {
      setCompletedProfile(false)
    } else {
      setCompletedProfile(true)
    }
  }

  setuserData(User)
  checkProfileCompletion(userData) // there might be issues with rendering this

  return (
    <div>
      {CompletedProfile ?
        authorizedUser(userData)
      :
        <CreateUsernameComponent
          User={UserData}
          authorizeUser={authorizeUser}
        />
      }
    </div>
  )
}

export default AuthorizationComponent