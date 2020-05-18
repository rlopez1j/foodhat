import React, { useState } from 'react'
import HomeComponent from './home'
import SignUpComponent from './signup'
import AuthorizationComponent from './authorization'

const AuthComponent = () => {
    const [User, setUser] = useState(null)
    const [Authenticated, setAuthenticated] = useState(false)
    const [Authorized, setAuthorized] = useState(false)

    const successfulLogin = returnedUser => {
        setAuthenticated(true)
        setuserData(returnedUser)
    }

    const authorizeUser = user => {

    }

    return (
        <div>
            {Authenticated ?
                (<AuthorizationComponent
                    User={User}
                    authorizeUser={authorizeUser}
                />)
                :
                (<SignUpComponent
                    User={User}
                    successfulLogin={successfulLogin}
                />)
            }
            
        </div>
    )
}

export default AuthComponent