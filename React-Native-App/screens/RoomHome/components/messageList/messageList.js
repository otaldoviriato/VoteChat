import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, FlatList } from 'react-native'
import io from 'socket.io-client'
import MessageDetails from '../messageDetails/messageDetails'
import { API_URL } from '../../../../constants'
import { AuthContext } from '../../../../context/authContext'
import axios from 'axios'

const socket = io.connect(API_URL)

const MessageList = (props) => {
  const [oldMessages, setOldMessages] = useState([])
  const [id_user, setIdUser] = useState(null)
  const { token } = useContext(AuthContext)
  id_sala = props.data._id

  useEffect(() => {
    const request = async () => {
      const url = API_URL+'/api/roomProfileScreenAPI/messageDetails'
      const headers = {
        headers: {
          "Content-Type": "application/json",
           'Authorization': `${token || ''}`
        }
      }
      const body = {id_sala}

      await axios.post(url, body, headers)
        .then((res) => {
          setOldMessages(res.data.roomDetails.mensagens)
          setIdUser(res.data.id_user)
        })
        .catch((err) => console.error('Error listing mesages:', err))
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
            <MessageDetails data={item} id_user={id_user} />
          )}
        />
      </View>
    </>
  )
}

export default MessageList