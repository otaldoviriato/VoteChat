import { AuthContext } from "../../../../context/authContext"
import { useContext, useState } from "react"
import { View, Text, TouchableOpacity, TextInput } from 'react-native'


export default function EnterRoom() {
    const { user } = useContext(AuthContext)
    const [mensagem, setMensagem] = useState('')
    const [idSala, setIdSala] = useState('')

    const handleSubmit = async () => {
        console.log('ok')

        try {

            const res = await fetch("http://192.168.100.2:3000/api/ScreenAPI/enterRoom", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_sala: idSala,
                    id_user: user?._id
                }),
            })

            if (res.ok) {
                setMensagem("Solicitação enviada!")
                setIdSala("")
            } else {
                console.log("User registration failed.")
            }
        } catch (error) {
            console.log('error during registraion')
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