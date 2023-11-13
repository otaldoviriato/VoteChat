import { View, StyleSheet, Platform, StatusBar } from 'react-native'
import React from 'react'
import CreateRoom from './components/createRoom/createRoom'
import EnterRoom from './components/enterRoom/enterRoom'


export default function App() {

  return (
    <View style={styles.container} >
      <CreateRoom />
      <EnterRoom />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
})