import React, { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import SocketComponent from './components/socketComponent/socketComponent'

function RoomDetails() {
  const navigation = useNavigation()
  const route = useRoute()

    // Acesse as props da rota
    const { data } = route.params

  return (
    <View>
      <Text>Nome da Sala: {data.name}</Text>
      <SocketComponent data={data}/>
      <Button
        title="Voltar"
        onPress={() => navigation.goBack()}
      />
    </View>
  )
}

export default RoomDetails
