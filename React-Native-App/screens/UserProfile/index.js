import React, { useState, useContext, useEffect } from 'react';
import { Text, TouchableOpacity, View, TextInput, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { AuthContext } from '../../context/authContext';
import { API_URL } from '../../constants';

export default function UserProfile() {
    const { user } = useContext(AuthContext);
    const [dataUser, setDataUser] = useState();
    const [isEditingName, setIsEditingName] = useState(false);
    const [newName, setNewName] = useState('');
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [isEditingPicture, setIsEditingPicture] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    async function getUserData() {
        try {
            const res = await fetch(API_URL+'api/userProfileScreenAPI/dataUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user.trim() || ''}`,
                },
                body: JSON.stringify({}),
            });

            if (res.ok) {
                const dataUser = await res.json();
                setDataUser(dataUser);
            } else {
                console.log('Error:', res.status);
            }
        } catch (error) {
            console.error('Erro trazendo dados do usuário:', error);
        }
    }

    async function updateUser(field) {
        try {
            let updateData = {};

            if (field === 'name') {
                updateData = { name: newName };
            } else if (field === 'email') {
                updateData = { email: newEmail };
            } else if (field === 'profileImage') {
                // Adicione a lógica para enviar a imagem ao servidor
                updateData = { profileImage: selectedImage };
            }

            const res = await fetch('http://192.168.100.5:3000/api/homeScreenAPI/updateUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user.trim() || ''}`,
                },
                body: JSON.stringify(updateData),
            });

            if (res.ok) {
                const updatedDataUser = await res.json();
                setDataUser(updatedDataUser);
                setIsEditingName(false);
                setIsEditingEmail(false);
            } else {
                console.log('Error:', res.status);
            }
        } catch (error) {
            console.error('Erro atualizando dados do usuário:', error);
        }
    }

    const handleImagePicker = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access media library was denied');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                setSelectedImage(result.assets[0].uri);
                console.log(result.assets[0].uri)
            }
        } catch (error) {
            console.error('Error picking an image:', error);
        }
    };

    const handleCancel = (field) => {
        if (field === 'name') {
            setNewName('');
            setIsEditingName(false);
        } else if (field === 'email') {
            setNewEmail('');
            setIsEditingEmail(false);
        }
        else if (field === 'profileImage') {
            setSelectedImage(null);
            setIsEditingPicture(false);
        }
        // Add logic for other fields if needed
    };

    useEffect(() => {
        getUserData();
    }, [user]);

    return (
        <>
            <View>
                <Text>Nome:</Text>
                {isEditingName ? (
                    <>
                        <TextInput
                            value={newName}
                            onChangeText={setNewName}
                            placeholder="Novo nome"
                        />
                        <TouchableOpacity onPress={() => updateUser('name')}><Text>Salvar</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => handleCancel('name')}><Text>Cancelar</Text></TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity onPress={() => setIsEditingName(true)}><Text>Alterar nome</Text></TouchableOpacity>
                )}
            </View>
            <Text></Text>
            <View>
                <Text>Email:</Text>
                {isEditingEmail ? (
                    <>
                        <TextInput
                            value={newEmail}
                            onChangeText={setNewEmail}
                            placeholder="Novo email"
                        />
                        <TouchableOpacity onPress={() => updateUser('email')}><Text>Salvar</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => handleCancel('email')}><Text>Cancelar</Text></TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity onPress={() => setIsEditingEmail(true)}><Text>Alterar email</Text></TouchableOpacity>
                )}
            </View>
            <Text></Text>
            <View>
                <Text>Foto de Perfil:</Text>
                {selectedImage ? (
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={{ uri: selectedImage }}
                    />
                ) : (
                    <TouchableOpacity onPress={handleImagePicker}><Text>Selecionar imagem</Text></TouchableOpacity>
                )}
                {selectedImage && (
                <>
                    <TouchableOpacity onPress={() => updateUser('profileImage')}><Text>Salvar imagem</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handleCancel('profileImage')}><Text>Cancelar</Text></TouchableOpacity>
                </>
                )}
            </View>
        </>
    )
}
