import React, { createContext, useRef, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState({name: null, email: null, profilePicture: null })
  const [token, setToken] = useState()
  const [roomData, setRoomData] = useState([])













  useEffect(() => {
    const fetchUser = async () => {
        console.log("Buscando informações do usuário no Armazenamento local")

        const storedUser = JSON.parse(await AsyncStorage.getItem('user'));
        const storedToken = await AsyncStorage.getItem('token')
        
        if (storedToken) {
          setToken(storedToken)
          console.log("Token encontrado no Armazenamento local e salvo no contexto")
        }else{
          console.log("Token não encontrado no Armazenamento local") 
        }
        
      }
    fetchUser();
  }, []); 














  
 const isInitialMount = useRef(true);

 useEffect(() => {
   if (isInitialMount.current) {
     isInitialMount.current = false;
   } else {
     const fetchUser = async () => {
       await AsyncStorage.setItem('user', JSON.stringify(user));
     };

     console.log('Dados do contexto salvo no armazenamento local');

     fetchUser();
   }
 }, [user]);














  return (
    <AuthContext.Provider value={{ user, setUser, roomData, setRoomData, token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider