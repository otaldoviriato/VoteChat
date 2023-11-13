import { AuthContext } from "../../../../context/authContext"
import { useContext, useState } from "react"
import { View, Text, TouchableOpacity, TextInput } from 'react-native'


export default function EnterRoom() {
    const { user } = useContext(AuthContext)
    const [name, setName] = useState('')

    const handleSubmit = async () => {
        console.log('ok')
        const id = user?._id

        if (!name) {
            setError("Preencha todos os campos");
            return
        }

        try {

            const res = await fetch("http://192.168.100.5:3000/api/ScreenAPI/createRoom", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    id
                }),
            })

            if (res.ok) {
                setName('')
            } else {
                console.log("Registro da sala falhou.");
            }

        } catch (error) {
            console.log('error during registraion')
        }
    }

    return (
        <>
            <View >
                <TextInput
                    placeholder="Digite o nome da sala"
                    label="name"
                    value={name}
                    onChangeText={setName}
                />
                <TouchableOpacity
                    onPress={handleSubmit}
                >
                    <Text >Criar Sala</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}