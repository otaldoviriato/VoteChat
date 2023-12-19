import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, Button, TextInput, Text, FlatList } from 'react-native'
import io from 'socket.io-client'
import { AuthContext } from '../../../../context/authContext'
import { API_URL } from '../../../../constants'

const socket = io.connect(API_URL)

const MessageInput = (props) => {  
    const { token } = useContext(AuthContext)
    const [message, setMessage] = useState('')

      // Envia a mensagem para o servidor
  const sendMessage = () => {
    if (message !== '') {
      const messageData = {
        id_sala: props.data._id,
        token: token,
        message: message,
      };
      socket.emit('message', messageData);
    }
    setMessage('') // Limpa a mensagem após o envio
  }
    
    return (
    <>
      <View>
        <TextInput placeholder="Digite sua mensagem" value={message} onChangeText={text => setMessage(text)} />
        <Button title='Enviar Mensagem' onPress={sendMessage}></Button>
      </View>
    </>
  )
}

export default MessageInput