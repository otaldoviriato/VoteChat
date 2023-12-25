import React, { useState, useContext } from 'react'
import { View, TextInput, Text } from 'react-native'
import io from 'socket.io-client'
import { AuthContext } from '../../../../context/authContext'
import { API_URL } from '../../../../constants'
import { bottomBar, messageInput } from '../../../../styles'
import { AntDesign, Fontisto, Ionicons } from '@expo/vector-icons'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native-gesture-handler'

const socket = io.connect(API_URL)

const MessageInput = (data) => {
  const { token } = useContext(AuthContext)
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const sendMessage = () => {
    if (message !== '') {
      const messageData = {
        id_sala: data.data._id,
        token: token,
        message: message,
      }
      socket.emit('message', messageData)
    }
    setMessage('')
    setIsTyping(false)
  };

  const handleTyping = (text) => {
    setMessage(text)
    setIsTyping(text.length > 0)
  }

  return (
    <>
      <GestureHandlerRootView style={bottomBar}>

        <TouchableOpacity>
          <Fontisto name="smiley" size={24} color="#295B80" />
        </TouchableOpacity>

        <View style={messageInput}>
          <TextInput placeholder="Digite sua mensagem" value={message} onChangeText={handleTyping} />
        </View>
        
        {isTyping && (
          <TouchableOpacity>
            <Ionicons name="send" size={24} color="#295B80" style={{ marginRight: 10 }} onPress={sendMessage} />
          </TouchableOpacity>
        )}
        <TouchableOpacity>
          <Fontisto name="paperclip" size={24} color="#295B80" />
        </TouchableOpacity>
      </GestureHandlerRootView >
    </>
  )
}

export default MessageInput