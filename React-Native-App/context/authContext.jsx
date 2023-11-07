import React, { createContext, useContext, useState } from 'react'

export const AuthContext = createContext()

function AuthProvider( {children} ){
    const [user, setUser] = useState()

    return(
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider