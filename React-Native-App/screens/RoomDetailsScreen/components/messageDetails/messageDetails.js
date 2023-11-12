import React from 'react';
import { View, Text, Image } from 'react-native';

export default function MessageDetails({ data }) {

  function extrairNomeAbreviado(nomeCompleto) {
      if(nomeCompleto){
      // Divida a string pelo espaço em branco para obter partes separadas
      const partesDoNome = nomeCompleto.split(' ');

      // Verifique se existem pelo menos duas partes (nome e sobrenome)
      if (partesDoNome.length >= 2) {
        const nome = partesDoNome[0];
        const primeiroSobrenome = partesDoNome[1][0]; // Primeira letra do primeiro sobrenome

        return `${nome} ${primeiroSobrenome}.`;
      } else {
        // Se não houver espaço em branco, considere a string inteira como o nome
        return nomeCompleto;
      }
    }
  }

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {data.path && (
          <Image
            style={{ width: 56, height: 56, borderRadius: 28 }}
            source={{ uri: data.path }}
            alt="Foto de Perfil"
          />
        )}
        <View style={{ marginLeft: 12 }}>

          <Text style={{ color: 'cyan' }}>{extrairNomeAbreviado(data.name)}</Text>
          
          <Text>{data.conteudo}</Text>
      
        </View>
      </View>
    </View>
  )
}