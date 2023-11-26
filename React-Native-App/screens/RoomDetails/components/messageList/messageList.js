import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, Button, TextInput, Text, FlatList } from 'react-native'
import io from 'socket.io-client'
import MessageDetails from '../messageDetails/messageDetails'
import { AuthContext } from '../../../../context/authContext'
import { API_URL } from '../../../../constants'
import MessageInput from '../messageInput/messageInput'

const socket = io.connect(API_URL)

const MessageList = (props) => {
  const [oldMessages, setOldMessages] = useState(props.data.mensagens)


  useEffect(() => {
    const handleMessage = (message) => {
      console.log('received message');
      setOldMessages((prevMessages) => [
        ...prevMessages,
        {
          _id: message._id,
          name: message.name,
          path: message.path,
          conteudo: message.data,
        },
      ])

    };

    socket.emit('join_room', props.data._id)

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [socket])


  return (
    <>
      <View>
        <FlatList
          data={oldMessages}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <MessageDetails data={item} />
          )}
        />
        <MessageInput {...props}/>
      </View>
    </>
  )
}

export default MessageList