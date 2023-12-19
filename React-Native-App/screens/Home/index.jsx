import React from 'react'
import { View } from 'react-native'
import RoomsList from './components/RoomsList'
import NewRoomButton from './components/NewRoomButton'

export default function ListRoomsScreen() {

  return (
    <>
      <View className="flex-1 bg-[#ffffff]">
        <RoomsList />
        <NewRoomButton />
      </View>
    </>
  )
}