import axios from 'axios'
import { API_URL } from '../../../../constants'
import { TextInput, Button, Text } from 'react-native'
import React, { useState, useContext } from 'react'
import { AuthContext } from '../../../../context/authContext'

export default function roomAnswer(props) {
    const { token } = useContext(AuthContext)

    const [mensagem, setMensagem] = useState('')
    const [answer, setAnswer] = useState('')

    const request = async () => {
        const url = API_URL + "api/roomDetailsScreenAPI/changeRoom"
        const headers = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `${token || ''}`
            }
        }
        const body = {
            id_sala: props.id_sala,
            pedidoEm: new Date(),
            action: "add_member",
            actionData: { token: token },
            actionDescription: answer,
        }

        await axios.post(url, body, headers)
            .then((res) => {
                if (res.data.status == 404) {
                    setMensagem("Sala não encontrada")
                } else if (res.data.status == 401) {
                    setMensagem("Você já é membro ou está pendente nesta sala!")
                } else {
                    setMensagem("Você entrou para a lista de pendentes, os partcipantes tem até 7 dias para votar")
                }
            }).catch(function (error) { console.error(error) })
    }

    return (
        <>
            <TextInput
                placeholder="Digite alguma coisa"
                value={answer}
                onChangeText={(text) => setAnswer(text)}
            />
            <Button title="Enviar" onPress={request} />
            <Text>{mensagem}</Text>
        </>
    )
}