import { useState, React, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Entypo } from '@expo/vector-icons';
import { AuthContext } from '../../../context/authContext'

const NewRoomButton = () => {
  const { setUser } = useContext(AuthContext)

  async function deslogar () {
    await AsyncStorage.removeItem('user1')
    setUser(null)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={deslogar} style={styles.button}>
        <Entypo name="plus" size={42} color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 30,
    bottom: 100,
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#edc618',
    borderRadius: 100,
  },
});

export default NewRoomButton;