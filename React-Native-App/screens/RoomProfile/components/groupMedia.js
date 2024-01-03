import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { groupProfileInfos, groupProfileView, groupProfileViewInfo, groupProfileViewName } from '../../../styles';
import { Entypo } from '@expo/vector-icons';

export default function profilePicture({ data }) {

    const mediaCount = 0

    // Alterar model para terminar código

    return (
        <View style={groupProfileView}>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                <Text style={groupProfileViewName}>Mídias</Text>
                <Entypo name="dot-single" size={16} color="#295B80" />
                <Text style={groupProfileViewInfo}>{mediaCount}</Text>
            </View>
            {mediaCount > 0 ? (
                <FlatList
                    data={data.votations}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('NomeDaSuaStack', { votationId: item.id })}
                            style={{ marginBottom: 10 }}
                        >
                            {/* Conteúdo do TouchableOpacity para cada foto */}
                            {/* ALTERAR MODEL 'SALA' PARA ACERTAR O FLATLIST*/}
                            <Text>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <Text style={groupProfileInfos}>O grupo ainda não têm mídias</Text>
            )}
        </View>
    )
}