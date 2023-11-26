import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext()

function AuthProvider( {children} ){
    const [user, setUser] = useState()
    const [roomData, setRoomData] = useState([])

    //Atualiza a state user com o id do usuário caso o mesmo já esteja logado.
    useEffect(() => {
        const fetchUser = async () => {
          const storedUser = await AsyncStorage.getItem('user1');
          if(storedUser){setUser(storedUser)}

          console.log("Esse é o token: "+storedUser)
        };
      
        fetchUser();

        
      }, []);

  

    return(
        <AuthContext.Provider value={{user, setUser, roomData, setRoomData}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider