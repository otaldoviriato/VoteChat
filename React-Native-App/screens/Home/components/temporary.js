import { AuthContext } from "../../../context/authContext"
import { useContext, useState } from "react"
import { View, Text, TouchableOpacity, TextInput } from 'react-native'


export default function EnterRoom() {
    const { user } = useContext(AuthContext)
    const [mensagem, setMensagem] = useState('')
    const [idSala, setIdSala] = useState('')

    const handleSubmit = async () => {
        console.log('ok')

        try {

            const res = await fetch("http://192.168.100.5:3000/api/ScreenAPI/enterRoom", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_sala: idSala,
                    id_user: user?._id,
                    pedidoEm: new Date()
                }),
            })

            if (res.status == 200){
                setIdSala('')
            } 
            else if (res.status == 400){
                console.log('sala não encontrada')
            }
            else if (res.status == 401){
                setMensagem('usuário já é membro ou está pendente na sala')
                console.log('usuário já é membro ou está pendente na sala')
            }else {
                console.log("Registro do usuário falhou.", JSON.stringify(res))
            }

        } catch (error) {
            console.error('Erro durante a entrada na sala:', error)
        }

    }

    return (
        <>
            <View >
                <Text>{mensagem}</Text>
                <TextInput
                    placeholder="Digite o id da sala"
                    label="id_sala"
                    value={idSala}
                    onChangeText={setIdSala}
                />
                <TouchableOpacity
                    onPress={handleSubmit}
                >
                    <Text >Entrar na Sala</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}
