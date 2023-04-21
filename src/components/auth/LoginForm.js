import React, { useState, useContext } from 'react';
import {Alert, Image} from 'react-native';
import {
    Box,
    VStack,
    FormControl,
    Input,
    Button,
    Text,
    Pressable,
} from 'native-base';

import firebase from '../../utils/firebase';
import {useNavigation} from '@react-navigation/native';
import {getAuth, sendEmailVerification, signInWithEmailAndPassword} from "firebase/auth";
import {getFirestore, getDoc, doc} from "firebase/firestore";

const LoginForm = () => {
    const [email, setEmail] = useState('r3nn4.test@inbox.testmail.app');
    const [password, setPassword] = useState('');

    const auth = getAuth(firebase);
    const db = getFirestore(firebase);
    const navigation = useNavigation();
    const handleLogin = async () => {
        try {
            // Sign in the user
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (!user.emailVerified) {
                Alert.alert(
                    'Error',
                    'Please verify your email before logging in.',
                    [
                        {
                            text: 'OK',
                        },
                        {
                            text: 'Resend',
                            onPress: async () => {
                                try {
                                    await sendEmailVerification(user);
                                    Alert.alert('Email Verification', 'A new confirmation email has been sent to your email address.');
                                } catch (error) {
                                    console.log(error);
                                    Alert.alert('Error', 'There was an error sending the verification email. Please try again.');
                                }
                            },
                        },
                    ],
                    { cancelable: true }
                );
                return;
            }

            // Get user type
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const userType = userDoc.data().userType;

            // Determine the target dashboard
            const targetDashboard = userType === 'student' ? 'StudentDashboard' : 'TutorDashboard';

            // Reset the navigation stack and navigate to the appropriate dashboard
            navigation.navigate(targetDashboard);
        } catch (error) {
            Alert.alert('Error', 'Invalid email or password');
            console.log(error);
        }
    };

    const showSignUpPrompt = () => {
        Alert.alert(
            'Sign Up',
            'Choose your account type:',
            [
                { text: 'Student', onPress: () => handleSignUpChoice('student') },
                { text: 'Tutor', onPress: () => handleSignUpChoice('tutor') },
            ],
            { cancelable: true },
        );
    };


    const handleSignUpChoice = (userType) => {
        if (userType === 'student') {
            navigation.navigate('StudentSignUp');
        } else {
            navigation.navigate('TutorSignUp');
        }
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
                <Pressable onPress={showSignUpPrompt}>
                    <Text fontSize="md" color="blue.500">
                        Don't have an account? Sign Up
                    </Text>
                </Pressable>
            </VStack>
        </Box>
    );
};

export default LoginForm;
