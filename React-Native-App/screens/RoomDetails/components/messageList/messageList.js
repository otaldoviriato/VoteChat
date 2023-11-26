import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, FlatList } from 'react-native'
import io from 'socket.io-client'
import MessageDetails from '../messageDetails/messageDetails'
import { API_URL } from '../../../../constants'
import MessageInput from '../messageInput/messageInput'

const socket = io.connect(API_URL)

const MessageList = (props) => {
  const [oldMessages, setOldMessages] = useState([])
 
  useEffect(() => {
    /*
    Os dados precisam ser buscados ao abrir a sala
    Atualmente são buscados ao listar as salas.
    Logo já estarão desatualizados quando o usuário clicar.
    */
  }, [])

  useEffect(() => {
    const handleMessage = (message) => {
      console.log('received message');
      setOldMessages((prevMessages) => [
        ...prevMessages,
        {
          _id: message._id,
          name: message.name || "Usuário Anônimo",
          path: message.path || null,
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