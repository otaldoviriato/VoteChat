import React from 'react'
import { View, Text, Button } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

function RoomDetails() {
  const navigation = useNavigation()
  const route = useRoute()

  // Acesse as props da rota
  const { RoomName, RoomId } = route.params;

  return (
    <View>
      <Text>Nome da Sala: {RoomName}</Text>
      <Button
        title="Voltar"
        onPress={() => navigation.goBack()}
      />
    </View>
  )
}

export default RoomDetails
