import React, { useState, useContext } from 'react'
import { AuthContext } from '../../../../context/authContext'
import { View, StyleSheet, TouchableOpacity, Modal, TextInput, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import axios from 'axios'
import { API_URL } from '../../../../constants';
import storeAndSetToken from '../../../../commom/utils/functions/storeAndSetToken'

export default function NewRoomButton() {
  const { setRoomData, roomData, token, setToken, user } = useContext(AuthContext)

  const request = async () => {    
    const url = API_URL+"api/homeScreenAPI/createRoom"

    const headers = {
      headers: {
        "Content-Type": "application/json",
         'Authorization': `${token || ''}`
      }
    }
    const body = {
      name : user.name,
      salasCount: roomData.length,
    }

    await axios.post(url, body, headers)
      .then(async (res) => {
        console.log("Sala criada com sucesso!")

        if(!token){storeAndSetToken(res.data.token, setToken)}        
        
        setRoomData(prevRoomData => [...prevRoomData, res.data.roomData])
      }).catch((err) => console.error('Error creating room:', err))
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={request} style={styles.button}>
          <AntDesign name="plus" size={42} color="white" />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#295B80',
    borderRadius: 100,
  }
});
