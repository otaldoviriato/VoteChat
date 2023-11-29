import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../context/authContext'
import { Text, TouchableOpacity, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageField() {
    const [selectedImage, setSelectedImage] = useState(null)
    const [isEditingPicture, setIsEditingPicture] = useState(false)

    const { user } = useContext(AuthContext)

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
    }

    const request = async () => {
        const url = API_URL + 'api/votationsScreenAPI/getDataVotations'
        const headers = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `${user || ''}`
            }
        }
        const body = { newName }

        await axios.post(url, body, headers)
            .then((res) => {
                setIsEditingPicture(false)
            })
            .catch((err) => console.error('Error creating room:', err))
    }
    const handleCancel = () => {
        setSelectedImage(null);
        setIsEditingPicture(false);
    };

    return (
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
                    <TouchableOpacity onPress={request}><Text>Salvar imagem</Text></TouchableOpacity>
                    <TouchableOpacity onPress={handleCancel}><Text>Cancelar</Text></TouchableOpacity>
                </>
            )}
        </View>
    );
}
