import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../context/authContext'
import { Text, TouchableOpacity, TextInput, View } from 'react-native';
import { API_URL } from '../../../constants'
import axios from "axios"

export default function NameField() {
    const [isEditingName, setIsEditingName] = useState(false);
    const [newName, setNewName] = useState('');

    const { user, setUser, token } = useContext(AuthContext)

    const request = async () => {
        const url = API_URL + 'api/userProfileScreenAPI/updateUser'
        const headers = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `${token || ''}`
            }
        }
        const body = { newName }

        await axios.post(url, body, headers)
            .then((res) => {
                setUser(prevUser => ({
                    ...prevUser,
                    name: res.data.name
                }))
                setIsEditingName(false)
                setNewName('')
            })
            .catch((err) => console.error('Error updating user name:', err))
    }

    const handleCancel = () => {
        setNewName('');
        setIsEditingName(false);

    }

    return (
        <View>
            <Text>Nome: {user.name}</Text>
            {isEditingName ? (
                <>
                    <TextInput
                        value={newName}
                        onChangeText={setNewName}
                        placeholder="Novo nome"
                    />
                    <TouchableOpacity onPress={request}><Text>Salvar</Text></TouchableOpacity>
                    <TouchableOpacity onPress={handleCancel}><Text>Cancelar</Text></TouchableOpacity>
                </>
            ) : (
                <TouchableOpacity onPress={() => setIsEditingName(true)}><Text>Alterar nome</Text></TouchableOpacity>
            )}
        </View>
    );
}
