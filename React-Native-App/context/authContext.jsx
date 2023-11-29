import React, { createContext, useRef, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState({token: null, name: null, email: null, profilePicture: null })
  const [roomData, setRoomData] = useState([])
  const isFetchingUserRef = useRef(false);

  // Atualiza o estado user com o token do usuário caso o mesmo já esteja logado.
  useEffect(() => {
    const fetchUser = async () => {
      // Verifica se o useEffect está sendo chamado internamente
      if (!isFetchingUserRef.current) {
        const storedUser = await AsyncStorage.getItem('user1');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        console.log("Esse é o token: " + storedUser);
      }
    };
 
    fetchUser();
  }, []); // Dependências vazias para executar apenas uma vez no montar do componente

  // Atualiza o AsyncStorage quando o estado user for alterado, mas não se a alteração vier do useEffect acima
  useEffect(() => {
    const fetchUser = async () => {
      // Marca que o useEffect está sendo chamado internamente
      isFetchingUserRef.current = true;
      await AsyncStorage.setItem('user1', JSON.stringify(user));
      // Reseta a marca após a execução do AsyncStorage
      isFetchingUserRef.current = false;
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