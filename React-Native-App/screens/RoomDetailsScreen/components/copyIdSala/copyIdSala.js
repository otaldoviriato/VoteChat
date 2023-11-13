import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';

export default function CopyIdSala({ id_sala }) {

  return (
    <View>
      <TextInput
        value={id_sala}
        editable={true}
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}
      />
    </View>
  )
}