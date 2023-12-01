import * as ImagePicker from 'expo-image-picker'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useState } from "react"

export default function imagePicker() {
    const [selectedImage, setSelectedImage] = useState(null)

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

    return (
        <>
            <View>
                <TouchableOpacity onPress={handleImagePicker}>
                    <Text>Selecionar Imagem</Text>
                </TouchableOpacity>

                {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
            </View>
        </>
    )
}