import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext'

// Importe os componentes de tela que você deseja navegar
import LoginScreenComponent from '../screens/Login/';
import TabNavigatorComponent from './TabNavigator';


function Nav() {
  const { auth } = useContext(AuthContext);
  return auth ? <TabNavigatorComponent/> : <LoginScreenComponent/>;
};

export default Nav;

