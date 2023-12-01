import React, { useEffect, useContext, useRef } from 'react'
import { SafeAreaView, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import styled from 'styled-components/native'
import { AuthContext } from '../../../../context/authContext'
import { COLORS } from '../../../../theme/colors'
import { API_URL } from '../../../../constants';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import storeAndSetToken from '../../../../commom/utils/functions/storeAndSetToken'

const ContainerView = styled.View`
  background-color: gray;
  margin-bottom: 20px;
  min-height: 80px;
  width: 100%;
  border-radius: 5px;
`

const NoRoomsText = styled.Text`
  min-height: 80px;
  width: 100%;
  padding-top: 50%;
  text-align: center;
  font-size: 24px;
  color: ${COLORS.white};
`

const Item = ({ data }) => {

  const navigation = useNavigation() 

  const handlePress = () => {
    navigation.navigate('DetalhesDaSala', { data })
  }

  if (!data) {
    return null 
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <ContainerView>
        <Text>{data.name}</Text>
      </ContainerView>
    </TouchableOpacity>
  )
}

function RoomsList() {
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

  useEffect(() => {
    if(token){
      console.log("Buscando lista de salas")
      request();
    }
  }, [token]);




  
  return (
    <SafeAreaView style={styles.container}>
      {user && roomData && roomData.length > 0 ? (
        <FlatList
          data={roomData}
          renderItem={({ item }) => <Item data={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (<NoRoomsText>
        Sem grupos para exibir
      </NoRoomsText>

      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
  },
})

export default RoomsList