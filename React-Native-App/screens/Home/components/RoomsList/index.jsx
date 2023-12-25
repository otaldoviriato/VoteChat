import React, { useEffect, useContext, useState } from 'react'
import { SafeAreaView, View, FlatList, Text, TouchableOpacity, Image } from 'react-native'
import { AuthContext } from '../../../../context/authContext'
import { API_URL } from '../../../../constants';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import storeAndSetToken from '../../../../commom/utils/functions/storeAndSetToken'
import { chatProfilePicture, chatInfo, chatName, chatLastMessage, time, chatMessagesCount } from '../../../../styles'
import io from 'socket.io-client'

const socket = io.connect(API_URL)

const Item = ({ data }) => {
  const [ultimaMessage, setUltimaMessage] = useState('')


  const navigation = useNavigation()

  const handlePress = () => {
    navigation.navigate('HomeDaSala', { data })
  }

  if (!data) {
    return null
  }

  const mensagensCount = data.mensagens ? data.mensagens.length : 0;

  const ultimaMensagem = mensagensCount > 0 ? data.mensagens[mensagensCount - 1] : null;

  // Converter o campo createdAt para um objeto Date
  const createdAtDate = new Date(ultimaMensagem ? ultimaMensagem.createdAt : 0)

  // Obter as horas, minutos e segundos
  const horas = createdAtDate.getHours()
  const minutos = createdAtDate.getMinutes()

  // Adicionar um zero se o valor dos minutos for menor que 10
  const minutosFormatados = minutos < 10 ? `0${minutos}` : minutos

  const handleMessage = (message) => {
    console.log('received message', message.conteudo)
    setUltimaMessage(message.conteudo)
  }

  useEffect(() => {
    socket.emit('join_room', data._id)
    socket.on('message', handleMessage)

    return () => {
      // Limpar os listeners quando o componente for desmontado
      socket.off('message', handleMessage)
    }
  }, [data._id])

  return (
    <TouchableOpacity onPress={handlePress} style={chatInfo}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          style={chatProfilePicture}
          source={require('../../../../assets/default-group.jpg')}
        />

        <View style={{ marginLeft: 3 }}>
          <Text style={chatName}>{data.name}</Text>
          <Text style={chatLastMessage}>{ultimaMessage || (ultimaMensagem ? ultimaMensagem.conteudo : '')}</Text>
        </View>
      </View>

      <View style={{ maxHeight: '100%', justifyContent: 'center' }}>
        <Text style={time}>{horas}:{minutosFormatados}</Text>
        <View style={{ alignItems: 'center' }}>
          <Text style={chatMessagesCount}>{mensagensCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default function RoomsList() {
  const { user, roomData, setRoomData, token, setToken } = useContext(AuthContext)

  const request = async () => {
    const url = API_URL + 'api/homeScreenAPI/listRooms'
    const headers = {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `${token || ''}`
      }
    }
    const body = {}

    await axios.post(url, body, headers)
      .then((res) => {

        setRoomData(res.data.roomData)

        storeAndSetToken(res.data.token, setToken)

        console.log("Lista de salas carregada para o token: " + token)
      })
      .catch((err) => console.error('Error listing room:', err))
  }

  useEffect(() => {
    if (token) {
      console.log("Buscando lista de salas")
      request();
    }
  }, [token])

  return (
    <SafeAreaView>
      {user && roomData && roomData.length > 0 ? (
        <FlatList
          data={roomData}
          renderItem={({ item }) => <Item data={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (<Text>Sem grupos para exibir</Text>)}
    </SafeAreaView>
  )
}