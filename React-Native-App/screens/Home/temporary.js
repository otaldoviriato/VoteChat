import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function Home() {
    const [idSalaInput, setIdSalaInput] = useState('')

    const navigation = useNavigation()

    function redirect() {
        navigation.navigate('RequisitosDaSala', {
            id: idSalaInput,
        })
    }

    return (
        <>
            <View>
            <TextInput
                placeholder="Digite o ID da sala"
                value={idSalaInput}
                onChangeText={(text) => setIdSalaInput(text)}
            />
            <TouchableOpacity onPress={redirect}>
                <Text>Entrar nos Requisitos da Sala</Text>
            </TouchableOpacity>
        </View>
        </>
    )
}