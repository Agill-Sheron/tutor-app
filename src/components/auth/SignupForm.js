import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import firebase from '../../utils/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const auth = getAuth(firebase)
  const handleSignup = async () => {

      console.log(email)
      console.log(password)
      console.log(confirmPassword)

      if (password === confirmPassword) {
          createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  console.log(user)
                  // ...
              })
              .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log(errorMessage)
                  // ..
              });
    } else {
      Alert.alert('Error', 'Passwords do not match');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});

export default SignupForm;
