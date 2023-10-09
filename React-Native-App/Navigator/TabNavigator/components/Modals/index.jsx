import  React ,  { useState } from 'react';
import { TouchableOpacity, Modal, View, Text, StyleSheet, TextInput } from 'react-native';



const ModalComponent = ({ showModal, closeModal }) => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');

  async function handlerSendData(){

    await fetch('http://192.168.100.8:8080/inserirpatrimonio/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tipo: eventName,
        valor: eventDate,
      }),
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if (data == "Ok"){
        
      } 
    }).catch(function(error) {
      console.log(error);
    });
  }


  return (
    <Modal 
    visible={showModal}
    onRequestClose={closeModal}
     animationType="slide">
      <TouchableOpacity style={styles.closeButton} title="Fechar" onPress={closeModal}>
        <Text style={{fontSize: 24}}>x</Text>
      </TouchableOpacity>
      <View style={styles.modalContainer}>
      <Text>Favor informar o tipo do bem</Text>
        <TextInput
          value={eventName}
          onChangeText={(eventName) => setEventName(eventName)}
          placeholder={'Informe o tipo'}
          style={styles.input}
        />

      <Text>Favor informar o valor do bem</Text>
        <TextInput
          value={eventDate}
          onChangeText={(eventDate) => setEventDate(eventDate)}
          placeholder={'Informe o valor'}
          style={styles.input}
        />

        <TouchableOpacity title="Fechar" style={styles.sendButton} onPress={handlerSendData}>
          <Text style={{color: "white"}}>Inserir</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    alignItems: 'flex-end',
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    zIndex: 100,
    position: 'absolute',
    right: 0,
  },
  sendButton: {
    backgroundColor: 'gray',
    padding: 20,
  },
  input: {
    borderColor: "black",
    minHeight: 80,
  }
});

export default ModalComponent;
