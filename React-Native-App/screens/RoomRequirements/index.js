import React from 'react';
import { AuthContext } from "../../context/authContext"
import { useContext, useState } from "react"
import { View, Text, TouchableOpacity, TextInput } from 'react-native'


export default function RoomRequirementsScreen({ route }) {
    const { user } = useContext(AuthContext)
    const [mensagem, setMensagem] = useState('')

    const handleSubmit = async () => {
        console.log('ok')

        try {

            const res = await fetch("http://192.168.100.5:3000/api/ScreenAPI/enterRoom", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `${user.trim() || ''}`
                },
                body: JSON.stringify({
                    id_sala: idSala,
                    pedidoEm: new Date()
                }),
            })

            if (res.status == 200) {
                setMensagem("Solicitação enviado para o grupo com sucesso, o grupo tem até 7 dias para votar!")
            }
            else if (res.status == 400) {
                console.log('sala não encontrada')
            }
            else if (res.status == 401) {
                setMensagem('usuário já é membro ou está pendente na sala')
                console.log('usuário já é membro ou está pendente na sala')
            } else {
                console.log("Registro do usuário falhou.", JSON.stringify(res))
            }

        } catch (error) {
            console.error('Erro durante a entrada na sala:', error)
        }

    }

    return (
        <>
            <View>
                <Text>Entrar na Sala: {route.params?.id}</Text>
                <Text>{mensagem}</Text>
            </View>
        </>
    )
}