import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../context/authContext'
import { Text, TouchableOpacity, TextInput, View } from 'react-native';

export default function EmailField() {
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [newEmail, setNewEmail] = useState('');

    const { user } = useContext(AuthContext)

    const request = async () => {
        const url = API_URL+'api/votationsScreenAPI/getDataVotations'
        const headers = {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `${user || ''}`
          }
        }
        const body = { newName }
    
        await axios.post(url, body, headers)
          .then((res) => {
            setIsEditingName(false)
          })
          .catch((err) => console.error('Error creating room:', err))
      }
    const handleCancel = () => {
        setNewEmail('');
        setIsEditingEmail(false);

    };

    return (
        <View>
            <Text>Email:</Text>
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
