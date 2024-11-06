import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.navigate("Profile", { token });
      }
    };

    checkToken();
  }, [navigation]);

  const handleLogin = async () => {
    setUsernameError('');
    setPasswordError('');

    let hasError = false;

    if (!username) {
      setUsernameError("Username is required.");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password is required.");
      hasError = true;
    }

    if (hasError) return;

    try {
      const response = await axios.post('https://api.aroundme.co.in/login/businesslogin/', {
        username,
        password,
      });
      console.log("response  ", response.data.access);

      await AsyncStorage.setItem('token', response.data.access);
      setUsername("")
      setPassword("")

      navigation.navigate("Profile");
    } catch (error) {
      console.error("Login error", error);
      setPasswordError("Login failed. Please check your credentials.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: "600" }}>Welcome</Text>
      <View style={{ width: "100%" }}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter username"
        />
        {usernameError ? <Text style={styles.error}>{usernameError}</Text> : null}

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Enter password"
        />
        {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'left',
  },
});
