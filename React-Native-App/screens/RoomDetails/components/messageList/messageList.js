import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, FlatList } from 'react-native'
import io from 'socket.io-client'
import MessageDetails from '../messageDetails/messageDetails'
import { API_URL } from '../../../../constants'
import MessageInput from '../messageInput/messageInput'
import { AuthContext } from '../../../../context/authContext'
import axios from 'axios'

const socket = io.connect(API_URL)

const MessageList = (props) => {
  const [oldMessages, setOldMessages] = useState([])
  const { user } = useContext(AuthContext)
  id_sala = props.data._id

  useEffect(() => {
    const request = async () => {
      const url = API_URL+'/api/roomDetailsAPI/messageDetails'
      const headers = {
        headers: {
          "Content-Type": "application/json",
        }
      }
      const body = {id_sala, token_user: user}

      await axios.post(url, body, headers)
        .then((res) => {
          setOldMessages(res.data.mensagens)
        })
        .catch((err) => console.error('Error creating room:', err))
    } 

   request()
  }, [])

  useEffect(() => {
    const handleMessage = (message) => {
      console.log('received message')
      setOldMessages((prevMessages) => [
        ...prevMessages,
          message,
      ])
    }

    socket.emit('join_room', id_sala)

    socket.on("message", handleMessage)

    return () => {
      socket.off("message", handleMessage)
    }
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