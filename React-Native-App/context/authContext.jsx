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
          console.log("Dados encontrados: " + storedUserParse);
          console.log("Dados armazenados no Armazenamento local")
        }else{
          console.log("Nenhum dado encontrado no Armazenamento local")
        }
        
      }
    fetchUser();
  }, []); // Dependências vazias para executar apenas uma vez no montar do componente

  // Atualiza o AsyncStorage quando o estado user for alterado, mas não se a alteração vier do useEffect acima
  useEffect(() => {
    const fetchUser = async () => {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    };

    fetchUser();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, roomData, setRoomData }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider