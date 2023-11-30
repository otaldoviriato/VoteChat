import React from 'react'
import { View, StyleSheet } from 'react-native'
import RoomsList from './components/RoomsList'
import NewRoomButton from './components/NewRoomButton'
import Temporary from './temporary'

export default function ListRoomsScreen() {

  return (
    <>
      <View style={styles.container}>
        <RoomsList />
        <Temporary />
        <NewRoomButton />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9AD1FB',
  },
})