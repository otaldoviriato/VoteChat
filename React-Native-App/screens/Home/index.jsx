import React, { useEffect } from 'react'
import { View, StyleSheet, BackHandler, Alert } from 'react-native'
import RoomsList from './components/RoomsList'
import NewRoomButton from './components/NewRoomButton'

export default function ListRoomsScreen() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Fechar o aplicativo', 'Tem certeza que deseja fechar o aplicativo?', [
        {
          text: 'Cancelar',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Sim', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };
  
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
  
    return () => backHandler.remove();
  }, []);

  return (
  <>
    <View style={styles.container}>
      <RoomsList />
      <NewRoomButton />
    </View>
  </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
})