import React from 'react';
import { View, Text } from 'react-native'

export default function RoomRequirementsScreen({ route }){

    return(
        <>
        <View>
            <Text>Entrar na Sala: {route.params?.id}</Text>
        </View>
        </>
    )
}