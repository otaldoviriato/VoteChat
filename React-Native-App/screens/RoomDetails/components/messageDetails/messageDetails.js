import React from 'react'
import { View, Text, Image } from 'react-native'

export default function MessageDetails({ data }) {

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {data.remetente.path && (
          <Image
            style={{ width: 56, height: 56, borderRadius: 28 }}
            source={{ uri: data.path }}
            alt="Foto de Perfil"
          />
        )}
        <View style={{ marginLeft: 12 }}>

          <Text style={{ color: 'cyan' }}>{data.remetente.name ? data.remetente.name : "Usuário anônimo"}</Text>
          
          <Text>{data.conteudo}</Text>
      
        </View>
      </View>
    </View>
  )
}