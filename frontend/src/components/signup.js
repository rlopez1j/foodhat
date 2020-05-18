import React, { useState } from 'react'
import GoogleSignInCompoment from './google-sign-in'

const SignUpComponent = ({ User, successfulLogin }) => {
    const [LoggedIn, setLoggedIn] = useState(false)
    const [UserData, setUserData] = useState(null)

    setUserData(User) // might need to be in useEffect

    return (
        <div>
            <GoogleSignInCompoment User={UserData}/>
        </div>
    )
}

export default SignUpComponent