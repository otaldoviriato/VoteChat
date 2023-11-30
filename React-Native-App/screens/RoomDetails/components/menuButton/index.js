import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import { useNavigation } from '@react-navigation/native'

export default function MenuRoom({children, data}) {
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const navigation = useNavigation();

  return (
    <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
    <Menu
      visible={visible}
      anchor={<Text onPress={showMenu}>{children}</Text>}
      onRequestClose={hideMenu}
    >
      <MenuItem onPress={() => navigation.navigate('ListaDeVotações', { data })}>Lista de Pendentes</MenuItem>
    </Menu>
  </View>
  );
}
