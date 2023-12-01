import React from 'react'
import { View } from 'react-native'
import RoomDetails from './components/roomDetails'
import RoomAnswer from './components/roomAnswer'
import ImagePicker from '../../commom/utils/functions/imagePicker'

export default function RoomRequirementsScreen({ route }) {

  return (
    <>
      <View>
        <RoomDetails id_sala={route.params?.id}/>
        <RoomAnswer  id_sala={route.params?.id}/>
        <ImagePicker />
      </View>
    </>
  )
}