import React from 'react'
import { View, StyleSheet, Platform, StatusBar, ImageBackground } from 'react-native'
import { useRoute } from '@react-navigation/native'
import MessageList from './components/messageList/messageList'
import MessageInput from './components/messageInput/messageInput'
import { backgroundColor, backgroundDraft } from '../../styles'

export default function RoomHome() {

  const route = useRoute()

  const { data } = route.params

  return (
    <>
      <View style={backgroundColor}>
        <ImageBackground
          source={require('../../assets/background.png')}
          style={backgroundDraft}>
          <MessageList data={data} />
        </ImageBackground>
      </View>
      <MessageInput data={data} />
    </>
  )
}