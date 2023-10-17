import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { AuthContext } from '../../../../context/authContext'



const LoginComponent = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const { setAuth } = useContext(AuthContext)
 

  const handleSignIn = async () => {  
    const response = await fetch('http://192.168.100.5:3000/api/registrar/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            senha,
      }),
    })

    console.log(await response.json())
  }

  return (
    <View style={styles.container}>
        <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        label="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite seu endereço de e-mail"
        label="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        label="Senha"
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity style={styles.buttonLogin} onPress={handleSignIn}>
        <Text style={styles.textButtonLogin}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  input: {
    height: 55,
    backgroundColor: "white",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  forgotPasswordText: {
    textAlign: 'right',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxText: {
    fontSize: 16,
    marginLeft: 8,
  },
  buttonLogin: {
    marginTop: 20,
    backgroundColor: "#3117EB",
    borderRadius: 50,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textButtonLogin: {
    color: "white",
    fontSize: 16,
  },
});

export default LoginComponent;
