import React from 'react'
import { View, Text, Image } from 'react-native'
import { othersMessage, messageContent, messageSender, messageUserPicture, time, yourMessage } from '../../../../styles'

export default function MessageDetails({ data, id_user }) {
  const createdAtDate = new Date(data.createdAt)

  const horas = createdAtDate.getHours()
  const minutos = createdAtDate.getMinutes()

  const minutosFormatados = minutos < 10 ? `0${minutos}` : minutos

  const isCurrentUser = data.remetente._id === id_user;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: isCurrentUser ? 'flex-end' : 'flex-start' }}>
      <View>
        {data.remetente.profilePicture && (
          <Image
            style={messageUserPicture}
            source={{ uri: data.profilePicture }}
            alt="Foto de Perfil"
          />
        )}
      </View>
      <View style={[isCurrentUser ? yourMessage : othersMessage]}>
        <View>
          <Text style={messageContent}>{data.conteudo}</Text>
          <Text style={messageSender}>
            {isCurrentUser ? "" : (data.remetente.name ? data.remetente.name : "Usuário Anônimo")}
          </Text>
        </View>
        <Text style={time}>{horas}:{minutosFormatados}</Text>
      </View>
    </View>
  )
}