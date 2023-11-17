import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from "../../../../context/authContext"
import { View, StyleSheet, TouchableOpacity, Modal, TextInput, Text } from 'react-native'
import { Entypo } from '@expo/vector-icons'

export default function NewRoomButton() {
  const [modalVisible, setModalVisible] = useState(false)
  const [roomName, setRoomName] = useState('')
  const [roomDescription, setRoomDescription] = useState('')
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const { user } = useContext(AuthContext)

  const navigation = useNavigation()

  function openModal() {
    setCurrentPage(1);
    setModalVisible(true);
  }

  async function createRoom() {
    const id = user?._id

    try {
      const res = await fetch("http://192.168.100.5:3000/api/homeScreenAPI/createRoom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomName,
          roomDescription
        }),
      })

      const resposta = await res.json()
      await AsyncStorage.setItem('user1', JSON.stringify(resposta.token))
    } catch (error) {
      console.error("Error creating room:", error)
      throw error; // rethrow the error to be caught outside
    }
  }

  async function handleCreateRoom() {
    try {
      await createRoom()
    } catch (error) {
    }
  }


  function goToNextPage() {
    if (!roomName) {
      setError("Preencha todos os campos")
      return
    }
    // Lógica para lidar com a transição para a próxima página
    setCurrentPage(currentPage + 1)
  }

  function closeModal() {
    setModalVisible(false)
    setRoomName('')
    setRoomDescription('')
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={openModal} style={styles.button}>
          <Entypo name="plus" size={42} color="white" />
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
                <TouchableOpacity onPress={handleCreateRoom}>
                  <Text>Criar Sala</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
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
