import { View, StyleSheet, Platform, StatusBar } from 'react-native'
import React from 'react'
import EnterRoom from './components/enterRoom/enterRoom'


export default function App() {

  return (
    <View style={styles.container} >
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