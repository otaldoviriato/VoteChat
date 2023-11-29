import React, { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../../../context/authContext'

export default function MenuBtn({children}) {
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const navigation = useNavigation();

  const { setUser, user } = useContext(AuthContext)

  function deslogar () {
    console.log("Token REMOVIDO")
    setUser({token: null, name: null, email: null, profilePicture: null })
  }

  function openConfig () {
    navigation.navigate('PerfilDoUsuario')
  }

  return (
    <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
    <Menu
      visible={visible}
      anchor={<Text onPress={showMenu}>{children}</Text>}
      onRequestClose={hideMenu}
    >
      <MenuItem onPress={openConfig}>Perfil</MenuItem>
      <MenuItem onPress={hideMenu}>Menu item 2</MenuItem>
      <MenuItem disabled>Disabled item</MenuItem>
      <MenuDivider />
      <MenuItem onPress={deslogar}>Reset Token</MenuItem>
    </Menu>
  </View>
  );
}
