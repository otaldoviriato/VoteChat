import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, Button, TextInput, Text, FlatList } from 'react-native'
import io from 'socket.io-client'
import MessageDetails from '../messageDetails/messageDetails'
import { AuthContext } from '../../../../context/authContext'

const socket = io.connect("http://192.168.100.2:3000")

const SocketComponent = (props) => {
  const [message, setMessage] = useState('')
  const { user } = useContext(AuthContext)
  const [oldMessages, setOldMessages] = useState([])
  const [dadosDosUsuariosEnvolvidos, setDadosDosUsuariosEnvolvidos] = useState([])

  useEffect(() => {
    socket.emit('join_room', props.data._id)

    socket.on('message', (message) => {
      // Recebe mensagens do servidor e as adiciona ao estado de mensagens
      setOldMessages((prevMessages) => [
        ...prevMessages,
        {
          id: message.id,
          name: message.name,
          path: message.path,
          data: message.data,
        },
      ])
    })
  }, [])

  // Envia a mensagem para o servidor
  const sendMessage = () => {
    if (message !== '') {
      const messageData = {
        id_sala: props.data._id,
        id_user: user?._id,
        message: message,
      };
      socket.emit('message', messageData);
    }
    setMessage('') // Limpa a mensagem após o envio
  }

  const mensagens = props.data.mensagens

  //Limpa mensagens e retorna um array de strings contendo o _id dos remetentes sem repetição chamado remetentesUnicos

  function obterRemetentesUnicos(mensagens) {
    const remetentesUnicos = new Set()

    mensagens.forEach((objeto) => {
      remetentesUnicos.add(objeto.remetente)
    })
    // Converter o Set de remetentes únicos de volta para um array
    return Array.from(remetentesUnicos)
  }

  const remetentesUnicos = obterRemetentesUnicos(mensagens)

  //Criar Função

  //Busca no Banco de dados as informções dos remetentes listados e armazena em um array de objetos chamado dadosDosUsuariosEnvolvidos

  useEffect(() => {
    async function fetchData(remetentesUnicos) {
      try {
        const res = await fetch("http://192.168.100.2:3000/api/roomDetailsAPI/getDataRemetentesAPI", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            remetentesUnicos,
          }),
        })

        if (res.ok) {
          const dataRemetentes = await res.json()
          // Armazena os dados dos usuários envolvidos no estado "dadosDosUsuariosEnvolvidos"
          setDadosDosUsuariosEnvolvidos(dataRemetentes)
        } else {
          console.log('Error:', res.status)
        }

      } catch (error) {
        console.log('error fetching data', error)
      }
    }
    fetchData(remetentesUnicos)
  }, [])

  //Fim da Função

  //Cria um array de objetos inserindo os dados de dadosDosUsuariosEnvolvidos em cada objeto de mensagens onde o id do remetente é igual ao id do user em dadosDosUsuariosEnvolvidos

  function combinarUsuariosComMensagens(dadosDosUsuariosEnvolvidos, mensagens) {
    const resultado = [];

    dadosDosUsuariosEnvolvidos.forEach((usuario) => {
      const mensagensDoUsuario = mensagens.filter((mensagem) => mensagem.remetente === usuario._id);

      if (mensagensDoUsuario.length > 0) {
        resultado.push({
          _id: usuario._id,
          name: usuario.name,
          email: usuario.email,
          mensagens: mensagensDoUsuario,
        });
      }
    });

    return resultado
  }

  const mensagemComRemetente = combinarUsuariosComMensagens(dadosDosUsuariosEnvolvidos, mensagens)
  //refazer flatlist no oldMessages junto com messageDetails

  return (
    <>
      <View>
        <FlatList
          data={mensagemComRemetente}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MessageDetails
              user_name={item.name}
              data={item.mensagens}
              fotoPerfil={item.path}
            />
          )}
        />
        <TextInput placeholder="Digite sua mensagem" value={message} onChangeText={text => setMessage(text)} />
        <Button title='Enviar Mensagem' onPress={sendMessage}></Button>
      </View>
    </>
  )
}

export default SocketComponent