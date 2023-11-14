import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../../../../context/authContext'

// Importe os componentes de tela que você deseja navegar
import LoginScreenComponent from '../../../Login'
import NavigatorComponent from '../../../../Navigator'

function LoginLogic() {
  const { setUser, user } = useContext(AuthContext)

  useEffect(() => {

    const fetchData = async () => {
      const data = await checkUserExists()

      if(data){
        setUser(JSON.parse(data))
      }
    }
  
    fetchData()  
  }, [])

  const checkUserExists = async () => {
    return await AsyncStorage.getItem('user1')
  }

  return user ? <NavigatorComponent /> : <LoginScreenComponent />
}

export default LoginLogic