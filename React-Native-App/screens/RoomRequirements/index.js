import React from 'react';
import { AuthContext } from "../../context/authContext"
import { useContext, useState } from "react"
import { View, Text, TouchableOpacity, TextInput, Button, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'


export default function RoomRequirementsScreen({ route }) {
  const { user } = useContext(AuthContext)
  const [mensagem, setMensagem] = useState('')
  const [answer, setAnswer] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)

  const handleImagePicker = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access media library was denied');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        console.log(result.assets[0].uri)
      }
    } catch (error) {
      console.error('Error picking an image:', error);
    }
  }


  //Requisição para Incluir um usuário como pendente em uma sala
  const sendRequirements = async () => {
    const url = "http://192.168.100.5:3000/api/ScreenAPI/enterRoom"
    const headers = {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `${user || ''}`
      }
    }
    const body = {
      id_sala: route.params?.id,
      pedidoEm: new Date(),
      answer: answer,
      picture: selectedImage
    }

    await axios.post(url, body, headers)
      .then((res) => {

      }).catch(function (error) { console.log(error) })
  }

  return (
    <>
      <View>
        <Text>Entrar na Sala: {route.params?.id}</Text>
        <TextInput
          placeholder="Digite alguma coisa"
          value={answer}
          onChangeText={(text) => setAnswer(text)}
        />
        <Text></Text>
        <TouchableOpacity onPress={handleImagePicker}>
          <Text>Selecionar Imagem</Text>
        </TouchableOpacity>
        {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
        <Text></Text>
        <Button title="Enviar" onPress={sendRequirements} />
        <Text>{mensagem}</Text>
      </View>
    </>
  )
}