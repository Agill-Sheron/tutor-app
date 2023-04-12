// src/components/Auth/LoginForm.js
import React, { useState } from 'react';
import { Image } from 'react-native';
import {
    Box,
    VStack,
    FormControl,
    Input,
    Button,
    Text,
    HStack,
    Pressable,
} from 'native-base';

import { useNavigation } from '@react-navigation/native';


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const navigation = useNavigation();
    const handleLogin = () => {
        // Implement login functionality here
    };

    const handleGoogleSignIn = () => {
        // Implement Google sign-in functionality here
    };

    const handleFacebookSignIn = () => {
        // Implement Facebook sign-in functionality here
    };

    const handleSignUp = () => {
        // Navigate to the sign-up screen here
        navigation.navigate('SignUp');

    };

    return (
        <Box flex={1} justifyContent="center" p={4} backgroundColor={'white'}>
            <VStack space={6} alignItems="center">
                <Image
                    source={require('../../../assets/images/logo.png')} // Replace with your logo file path
                    resizeMode="contain"
                    style={{ width: 250, height: 250 }}
                />
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
                <Button onPress={handleLogin}>
                    <Text color={'white'}>Login</Text>
                </Button>
                <HStack justifyContent="center" space={4}>
                    <Button onPress={handleGoogleSignIn} variant="outline">
                        <Text>Sign in with Google</Text>
                    </Button>
                    <Button onPress={handleFacebookSignIn} variant="outline">
                        <Text>Sign in with Facebook</Text>
                    </Button>
                </HStack>
                <Pressable onPress={handleSignUp}>
                    <Text fontSize="md" color="blue.500">
                        Don't have an account? Sign Up
                    </Text>
                </Pressable>
            </VStack>
        </Box>
    );
};

export default LoginForm;
