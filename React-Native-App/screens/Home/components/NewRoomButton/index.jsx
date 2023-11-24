import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../../../context/authContext'
import { View, StyleSheet, TouchableOpacity, Modal, TextInput, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export default function NewRoomButton() {
  const [modalVisible, setModalVisible] = useState(false)
  const [roomName, setRoomName] = useState('')
  const [roomDescription, setRoomDescription] = useState('')
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const { user, setUser, setRoomData } = useContext(AuthContext)

  const navigation = useNavigation()

  const request = async () => {
    const url = "http://192.168.100.5:3000/api/homeScreenAPI/createRoom"
    const headers = {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `${user || ''}`
      }
    }
    const body = {
      roomName,
      roomDescription,
    }

    await axios.post(url, body, headers)
      .then(async (res) => {
        closeModal()
        if (!user) {
          await AsyncStorage.setItem('user1', res.data.token)
          setUser(res.data.token)
        }
        setRoomData(prevRoomData => [...prevRoomData, res.data.roomData])
      }).catch((err) => console.error('Error creating room:', err))
  }

  function goToNextPage() {
    if (!roomName) {
      setError('Preencha todos os campos');
      return;
    }
    setCurrentPage(currentPage + 1);
  }

  function closeModal() {
    setModalVisible(false);
    setRoomName('');
    setRoomDescription('');
  }

  function openModal() {
    setCurrentPage(1);
    setModalVisible(true)
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={openModal} style={styles.button}>
          <AntDesign name="plus" size={42} color="white" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {currentPage === 1 && (
              <>
                <Text>Qual o nome da sala ?</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nome da Sala"
                  onChangeText={(text) => setRoomName(text)}
                  value={roomName}
                />
                <TouchableOpacity onPress={goToNextPage}>
                  <Text>Próxima</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeModal}>
                  <Text>Cancelar</Text>
                </TouchableOpacity>
                <Text>{error}</Text>
              </>
            )}
            {currentPage === 2 && (
              <>
                <Text>Agora explique quais coisas são relevantes para que um novo integrante seja aceito na sala (opcional):</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Requisitos para entrar na sala"
                  onChangeText={(text) => setRoomDescription(text)}
                  value={roomDescription}
                />
                <TouchableOpacity onPress={closeModal}>
                  <Text>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={request}>
                  <Text>Criar Sala</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
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
    bottom: 100,
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#edc618',
    borderRadius: 100,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 10,
    padding: 10,
  },
});
