import React, { useEffect, useState, useContext } from 'react'
import { SafeAreaView, View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { AuthContext } from '../../../../context/authContext'
import { useNavigation } from '@react-navigation/native'

const ContainerView = styled.View`
  background-color: white;
  margin-bottom: 20px;
  min-height: 80px;
  width: 100%;
`

const Item = ({ data }) => {
  const navigation = useNavigation() // Obtenha o objeto de navegação usando o hook useNavigation

  const handlePress = () => {
    // Navegue para a tela desejada quando o item for pressionado
    navigation.navigate('DetalhesDaSala', { data })
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
  const { user } = useContext(AuthContext)
  const id = user?._id
  
  const [roomdata, setRoomData] = useState([])
  const [numColumns, setNumColumns] = useState(1); // Inicialize com 1 coluna

  const changeNumColumns = (columns) => {
    setNumColumns(columns)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://192.168.100.5:3000/api/listRoomsAPI/listRooms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id
          }),
        })
        const RoomData = await res.json()
        setRoomData(RoomData)
      } catch (error) {
        console.log('error listing rooms', error)
      }
    }
    fetchData()
  }, [id])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={roomdata}
        renderItem={({ item }) => <Item data={item} />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        key={numColumns}
      />
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