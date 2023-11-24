import React, { useEffect, useContext, useState } from 'react';
import { View, StyleSheet, BackHandler, Alert } from 'react-native';
import RoomsList from './components/RoomsList';
import NewRoomButton from './components/NewRoomButton';
import Temporary from './temporary';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/authContext'

export default function ListRoomsScreen() {
  const { setUser, user } = useContext(AuthContext)

  useEffect(() => {
    async function verifyToken() {
      const userToken = await AsyncStorage.getItem('user1')
      setUser(userToken)
    }
    verifyToken()
  }, [user])


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
      return true
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)

    return () => backHandler.remove()
  }, [])

  return (
    <>
      <View style={styles.container}>
        <RoomsList />
        <Temporary />
        <NewRoomButton />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9AD1FB',
  },
})