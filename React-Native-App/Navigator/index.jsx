import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'

// Importe os componentes de tela que você deseja navegar
import LoginScreenComponent from '../screens/LoginScreen/'
import TabNavigatorComponent from './TabNavigator'


function Nav() {
  const { user } = useContext(AuthContext)
  return user ? <TabNavigatorComponent/> : <LoginScreenComponent/>
}

export default Nav