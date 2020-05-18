import React, { useState } from 'react'

const HomeComponent = ({ user }) => {
    const [UserData, setUserData] = useState(null)

    setUserData(user) // might need to be a useEffect
    
    return(
        <div>
            <h1> Hello {UserData.name}</h1>
        </div>
    )
}

export default HomeComponent