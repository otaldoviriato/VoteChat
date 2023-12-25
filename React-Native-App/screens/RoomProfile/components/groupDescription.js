import React from 'react';
import { View, Text } from 'react-native'
import { groupProfileInfos, groupProfileView, groupProfileViewInfo, groupProfileViewName } from '../../../styles';

export default function profilePicture({ data }) {
    let dataFormatada = 'N/A'; // Valor padrão para caso updatedAt seja nulo

    if (data.description && data.description.updatedAt) {
        const updatedAtDate = new Date(data.description.updatedAt);
        const dia = updatedAtDate.getDate();
        const mes = updatedAtDate.getMonth() + 1;
        const ano = updatedAtDate.getFullYear();
        dataFormatada = `${dia}/${mes}/${ano}`;
    }
    
    return (
        <View style={groupProfileView}>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                <Text style={groupProfileViewName}>Descrição  |  </Text>
                <Text style={groupProfileViewInfo}>Atualizado em {dataFormatada}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', width: '100%' }}>
                <Text style={groupProfileInfos}>{data.description ? data.description : 'O grupo ainda não tem uma descrição, adicione uma para que ela apareça aqui!'}</Text>
            </View>
        </View>
    )
}