import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, Button, TextInput, Text, FlatList } from 'react-native'
import io from 'socket.io-client'
import MessageDetails from '../messageDetails/messageDetails'
import { AuthContext } from '../../../../context/authContext'
import { API_URL } from '../../../../constants'

const socket = io.connect(API_URL)

const SocketComponent = (props) => {
  const [message, setMessage] = useState('')
  const { user } = useContext(AuthContext)
  const [oldMessages, setOldMessages] = useState(props.data.mensagens)
  const [dadosDosUsuariosEnvolvidos, setDadosDosUsuariosEnvolvidos] = useState([])

  useEffect(() => {
    const handleMessage = (message) => {
      console.log('received message');
      setOldMessages((prevMessages) => [
        ...prevMessages,
        {
          _id: message._id,
          name: message.name,
          path: message.path,
          conteudo: message.data,
        },
      ])
    };

    socket.emit('join_room', props.data._id)
  
    socket.on("message", handleMessage);
  
    return () => {
      socket.off("message", handleMessage);
    };
  }, [socket])

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

  //Limpa mensagens e retorna um array de strings contendo o _id dos remetentes sem repetição chamado remetentesUnicos

  function obterRemetentesUnicos(mensagens) {
    const remetentesUnicos = new Set()

    mensagens.forEach((objeto) => {
      remetentesUnicos.add(objeto.remetente)
    })
    // Converter o Set de remetentes únicos de volta para um array
    return Array.from(remetentesUnicos)
  }

  const remetentesUnicos = obterRemetentesUnicos(oldMessages)

  //Busca no Banco de dados as informções dos remetentes listados e armazena em um array de objetos chamado dadosDosUsuariosEnvolvidos

  useEffect(() => {
    async function fetchData(remetentesUnicos) {
      try {
        const res = await fetch(API_URL+"api/roomDetailsAPI/getDataRemetentes", {
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

  // Função para juntar mensagens com informações dos usuários
function juntarMensagensComUsuarios(mensagens, dadosDosUsuariosEnvolvidos) {
  const resultado = mensagens.map((mensagem) => {
    const usuario = dadosDosUsuariosEnvolvidos.find((u) => u._id.toString() === mensagem.remetente);
    if (usuario) {
      return {
        ...mensagem,
        name: usuario.name,
        email: usuario.email,
      };
    }
    return mensagem;
  });

  return resultado;
}

  const mensagemComRemetente = juntarMensagensComUsuarios(oldMessages ,dadosDosUsuariosEnvolvidos)
  //refazer flatlist no oldMessages junto com messageDetails

  return (
    <>
      <View>
      <FlatList
          data={mensagemComRemetente}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <MessageDetails data={item} />
          )}
        />
        <TextInput placeholder="Digite sua mensagem" value={message} onChangeText={text => setMessage(text)} />
        <Button title='Enviar Mensagem' onPress={sendMessage}></Button>
      </View>
    </>
  )
}

export default SocketComponent