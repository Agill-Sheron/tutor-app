import React, { useState } from 'react';
import { Alert } from 'react-native';
import firebase from '../../utils/firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Box, VStack, FormControl, Input, Button, Text } from 'native-base';


const SignupForm = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const auth = getAuth(firebase);
    const handleSignup = async () => {
        if (password === confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    navigation.navigate('RoleSelection', { email });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        } else {
            Alert.alert('Error', 'Passwords do not match');
        }
    };

    return (
        <Box flex={1} justifyContent="center" p={4} backgroundColor={'white'}>
            <VStack space={4}>
                <FormControl>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Confirm Password</FormControl.Label>
                    <Input
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        autoCapitalize="none"
                    />
                </FormControl>
                <Button onPress={handleSignup}>
                    <Text color={'white'}>Sign Up</Text>
                </Button>
            </VStack>
        </Box>
    );
};

export default SignupForm;
