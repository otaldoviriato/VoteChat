import React, { useEffect, useState, useContext } from 'react'
import { SafeAreaView, View, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import styled from 'styled-components/native'
import { AuthContext } from '../../../../context/authContext'
import { useNavigation } from '@react-navigation/native'

const ContainerView = styled.View`
  background-color: gray;
  margin-bottom: 20px;
  min-height: 80px;
  width: 100%;
  border-radius: 5px;
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
        <Image
          style={styles.tinyLogo}
          source={{
            uri: '../../../../../assets/default-group.jpg'
          }}
        />
      </ContainerView>
    </TouchableOpacity>
  )
}

function RoomsList() {
  const { user } = useContext(AuthContext)
  const [roomdata, setRoomData] = useState([])
  const [numColumns, setNumColumns] = useState(1) // Inicialize com 1 coluna

  const changeNumColumns = (columns) => {
    setNumColumns(columns)
  }

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          if (user) {
            const res = await fetch("http://192.168.100.5:3000/api/homeScreenAPI/listRooms", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `${user.trim() || ''}`,
              },
              body: JSON.stringify({}),
            });
  
            const RoomData = await res.json();
            setRoomData(RoomData);
          }
        } catch (error) {
          console.log('error listing rooms', error);
        }
      };
  
      fetchData()
    } 
  }, [user])


  return (
    <SafeAreaView style={styles.container}>
      {user ? (
        <FlatList
          data={roomdata}
          renderItem={({ item }) => <Item data={item} />}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
          key={numColumns}
        />
      ) : (
        <Text>Sem grupos para exibir</Text>
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