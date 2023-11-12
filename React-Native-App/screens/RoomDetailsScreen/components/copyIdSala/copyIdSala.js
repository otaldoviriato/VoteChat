import React from 'react'
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard'

export default function copyIdSala({ id_sala }) {
    
  const handlePress = () => {
    // Copia para a área de transferência
    Clipboard.setString('hello world')

    // Mostra uma mensagem indicando que o ID foi copiado
    ToastAndroid.showWithGravity(
      'ID Copiado para a Área de Transferência',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    )
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={{ padding: 10, borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}>
        <Text>ID da Sala: {id_sala}</Text>
        <Text>Toque para Copiar</Text>
      </View>
    </TouchableOpacity>
  )
}