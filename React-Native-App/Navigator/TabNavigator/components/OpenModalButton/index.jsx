import { useState, React } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import ModalComponent from '../Modals';

const OpenModalButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openModal} style={styles.button}>
        <Entypo name="plus" size={42} color="white" />
      </TouchableOpacity>
      <ModalComponent showModal={modalVisible} closeModal={closeModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 30,
    bottom: 100,
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#edc618',
    borderRadius: 100,
  },
});

export default OpenModalButton;