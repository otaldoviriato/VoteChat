import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-btr';
import { TextInput } from 'react-native-paper';
import { AuthContext } from '../../../../context/authContext'



const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { setAuth } = useContext(AuthContext);
 

  const handleLogin = async () => {  
    const response = await fetch('http://192.168.100.5:3000/api/login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        senha: password,
      }),
    });

    console.log(await response.json());

    if (response == true){
      setAuth(true);
    }else{ 
      setAuth(false);
    }
    
  };

  return (
    <View style={styles.container}>
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
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Esqueceu a senha</Text>
      </TouchableOpacity>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={rememberMe}
          onValueChange={setRememberMe}
          style={styles.checkbox}
        />
        <Text style={styles.checkboxText}>Manter conectado</Text>
      </View>
      <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
        <Text style={styles.textButtonLogin}>Login</Text>
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
    backgroundColor: "#1C98F7",
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
