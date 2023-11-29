import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../context/authContext'
import { Text, TouchableOpacity, TextInput, View } from 'react-native';
import { API_URL } from '../../../constants'
import axios from "axios"

export default function EmailField() {
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [newEmail, setNewEmail] = useState('');

    const { user, setUser } = useContext(AuthContext)

    const request = async () => {
        const url = API_URL + 'api/userProfileScreenAPI/updateUser'
        const headers = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `${user.token || ''}`
            }
        }
        const body = { newEmail }

        await axios.post(url, body, headers)
            .then((res) => {
                setUser(prevUser => ({
                    ...prevUser,
                    email: res.data.email
                }))
                setNewEmail('')
                setIsEditingEmail(false)
            })
            .catch((err) => console.error('Error updating user email:', err))
    }
    const handleCancel = () => {
        setNewEmail('');
        setIsEditingEmail(false);

    };

    return (
        <View>
            <Text>Email:  {user.email}</Text>
            {isEditingEmail ? (
                <>
                    <TextInput
                        value={newEmail}
                        onChangeText={setNewEmail}
                        placeholder="Novo email"
                    />
                    <TouchableOpacity onPress={request}><Text>Salvar</Text></TouchableOpacity>
                    <TouchableOpacity onPress={handleCancel}><Text>Cancelar</Text></TouchableOpacity>
                </>
            ) : (
                <TouchableOpacity onPress={() => setIsEditingEmail(true)}><Text>Alterar email</Text></TouchableOpacity>
            )}
        </View>
    );
}
