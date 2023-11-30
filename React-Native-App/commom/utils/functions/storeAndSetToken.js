import AsyncStorage from '@react-native-async-storage/async-storage'

export default async function storeAndSetToken(token, setToken){
      if (token) {
        setToken(token)
        await AsyncStorage.setItem('token', JSON.stringify(token));
        console.log("Token do NOVO usuário armazenado no contexto")
      }
}