import React from 'react'
import { View, Text } from 'react-native'
import { createURL, useURL } from 'expo-linking'

export default function EnterRoom(){
    const redirectURL = useURL()

    const url = createURL ('EnterRoom', {})
    console.log('URL=>', url)

    return (
        <>
        <View>
            <Text>{redirectURL}</Text>
        </View>
        </>
    )
}