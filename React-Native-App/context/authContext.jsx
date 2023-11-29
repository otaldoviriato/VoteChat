import React, { createContext, useRef, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState({token: null, name: null, email: null, profilePicture: null })
  const [roomData, setRoomData] = useState([])

  // Atualiza o estado user com o token do usuário caso o mesmo já esteja logado.
  useEffect(() => {
    const fetchUser = async () => {
        console.log("Buscando informações do usuário no Armazenamento local")

        const storedUser = await AsyncStorage.getItem('user')
        const storedUserParse = JSON.parse(storedUser)
        
        if (storedUserParse?.token) {
          setUser(storedUserParse)
          
          console.log("Dados encontrados no Armazenamento local e salvos no contexto")
        }else{
          console.log("Nenhum dado encontrado no Armazenamento local") 
        }
        
      }
    fetchUser();
  }, []); // Dependências vazias para executar apenas uma vez no montar do componente
  
 // Segundo useEffect: Atualiza o AsyncStorage quando o estado user for alterado, mas não se a alteração vier do useEffect acima
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
    <AuthContext.Provider value={{ user, setUser, roomData, setRoomData }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider