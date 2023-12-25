import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { groupProfileInfos, groupProfileView, groupProfileViewName } from '../../../styles'
import * as Clipboard from 'expo-clipboard'
import { Fontisto } from '@expo/vector-icons'

export default function profilePicture({ data }) {
    const link = 'www.votechat.com.br/group-invitation/' + id_sala

    async function copiarLink() {
        const id_sala = data._id
        const link = 'www.votechat.com.br/group-invitation/' + id_sala

        await Clipboard.setStringAsync(link)
    }

    return (
        <View style={groupProfileView}>
            <Text style={groupProfileViewName}>Link do Grupo: </Text>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', width: '100%' }}>
                <TouchableOpacity onPress={copiarLink} style={groupProfileInfos}><Text>{link}</Text></TouchableOpacity>
                <Fontisto onPress={copiarLink} name="share" size={24} color="#191919" />
            </View>
        </View>
    )
}