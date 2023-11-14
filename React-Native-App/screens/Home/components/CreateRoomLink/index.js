import React from 'react'
import { View, Text } from 'react-native'
import { createURL, useURL } from 'expo-linking'

export default function CreateRoomLink(){
    const redirectURL = useURL()

    const url = createURL('RequisitosDaSala', {})
    console.log('URL=>', url)

    return (
        <>
        <View>
            
        </View>
        </>
    )
}