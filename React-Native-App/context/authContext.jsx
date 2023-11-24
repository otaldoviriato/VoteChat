import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

function AuthProvider( {children} ){
    const [user, setUser] = useState()
    const [roomData, setRoomData] = useState([])

    return(
        <AuthContext.Provider value={{user, setUser, roomData, setRoomData}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider