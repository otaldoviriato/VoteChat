import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Menu, MenuItem } from 'react-native-material-menu'
import { useNavigation } from '@react-navigation/native'
import * as Clipboard from 'expo-clipboard'

export default function MenuRoom({children, data}) {
  const [visible, setVisible] = useState(false)

  const hideMenu = () => setVisible(false)

  const showMenu = () => setVisible(true)

  const navigation = useNavigation()

  async function copiarLink(){
    const id_sala = data._id
    const link = 'www.votechat.com.br/group-invitation/'+id_sala

    await Clipboard.setStringAsync(link)
  }

  return (
    <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
    <Menu
      visible={visible}
      anchor={<Text onPress={showMenu}>{children}</Text>}
      onRequestClose={hideMenu}
    >
      <MenuItem onPress={() => navigation.navigate('ListaDeVotações', { data })}>Lista de Pendentes</MenuItem>
      <TouchableOpacity onPress={copiarLink}><Text>Copiar Link</Text></TouchableOpacity>
    </Menu>
  </View>
  )
}