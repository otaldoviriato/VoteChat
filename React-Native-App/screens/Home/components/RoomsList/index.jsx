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

  return (
    <TouchableOpacity onPress={handlePress} className='h-20 bg-[#cae8ff]'>
      <View className='flex-row p-4'>
        <Image 
        source={require('../../../../assets/default-group.jpg')}
        className='h-10 w-10 rounded-full mr-3'/>
        <Text>{data.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default function RoomsList() {
  const { user, roomData, setRoomData, token, setToken } = useContext(AuthContext)

  const request = async () => {
    const url = API_URL+'api/homeScreenAPI/listRooms'
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

        console.log("Lista de salas carregada para o token: "+token)
      })
      .catch((err) => console.error('Error listing room:', err))
  }





  // Chamada sempre que houver mudança em user
  useEffect(() => {
    if(token){
      console.log("Buscando lista de salas")
      request();
    }
  }, [token]);




  
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