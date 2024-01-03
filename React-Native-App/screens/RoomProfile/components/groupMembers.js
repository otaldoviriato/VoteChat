import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { groupProfileInfos, groupProfileView, groupProfileViewInfo, groupProfileViewName } from '../../../styles';
import { Entypo } from '@expo/vector-icons';

export default function profilePicture({ data }) {

    const membersCount = data.members ? data.members.length : 0

    console.log(data.members)

    return (
        <View style={groupProfileView}>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                <Text style={groupProfileViewName}>Membros</Text>
                <Entypo name="dot-single" size={16} color="#295B80" />
                <Text style={groupProfileViewInfo}>{membersCount}</Text>
            </View>
            <FlatList
                data={data.members}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('PerfilDoMembro', { id_user: item.id_user })}
                        style={{ marginBottom: 10 }}
                    >
                        <Text>{item.id_user}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}