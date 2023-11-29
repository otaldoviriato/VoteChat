import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../context/authContext'
import { Text, TouchableOpacity, TextInput, View } from 'react-native';

export default function NameField() {
    const [isEditingName, setIsEditingName] = useState(false);
    const [newName, setNewName] = useState('');

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
        setNewName('');
        setIsEditingName(false);

    }

    return (
        <View>
            <Text>Nome:</Text>
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
