import React, { useEffect, useContext } from 'react'
import { SafeAreaView, View, FlatList, Text, TouchableOpacity, Image } from 'react-native'
import { AuthContext } from '../../../../context/authContext'
import { API_URL } from '../../../../constants';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import storeAndSetToken from '../../../../commom/utils/functions/storeAndSetToken'

const Item = ({ data }) => {

  const navigation = useNavigation()

  const handlePress = () => {
    navigation.navigate('DetalhesDaSala', { data })
  }

  if (!data) {
    return null
  }

  const mensagensCount = data.mensagens ? data.mensagens.length : 0;

  const ultimaMensagem = mensagensCount > 0 ? data.mensagens[mensagensCount - 1] : null;

  // Converter o campo createdAt para um objeto Date
  const createdAtDate = new Date(ultimaMensagem ? ultimaMensagem.createdAt : '')

  // Obter as horas, minutos e segundos
  const horas = createdAtDate.getHours()
  const minutos = createdAtDate.getMinutes()

  // Adicionar um zero se o valor dos minutos for menor que 10
  const minutosFormatados = minutos < 10 ? `0${minutos}` : minutos

  return (
    <TouchableOpacity onPress={handlePress} className='flex-row justify-between bg-[#ffffff] h-auto border border-solid border-[#ECECEC] py-2 px-4'>
      <View className='flex-row items-center'>
        <Image
          className='h-16 w-16 rounded-full'
          source={require('../../../../assets/default-group.jpg')}
        />

        <View className='items-start justify-start ml-3'>
          <Text className='text-[#313131] text-base' >{data.name}</Text>
          <Text className='text-[#ADADAD] text-sm' >{ultimaMensagem ? ultimaMensagem.conteudo : ''}</Text>
        </View>
      </View>

      <View className='max-h-max justify-center'>
        <Text className='text-[#ADADAD] text-xs' >{horas}:{minutosFormatados}</Text>
        <View className='items-center' >
          <Text className='text-[#FFFFFF] text-xs bg-[#52B5FF] px-1 rounded-full' >{mensagensCount}</Text>
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