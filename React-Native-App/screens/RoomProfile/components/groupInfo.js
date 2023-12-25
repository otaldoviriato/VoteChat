import React from 'react';
import { View, Text } from 'react-native'
import { groupProfileInfos } from '../../../styles';

export default function profilePicture({ data }) {

    const members = data.members ? data.members.length : 0

    return (
        <View style={{ flexDirection: 'row' }}>
            <Text style={groupProfileInfos}>Quórum: { }  |</Text>
            <Text style={groupProfileInfos}>  Membros: {members} </Text>
        </View>
    )
}