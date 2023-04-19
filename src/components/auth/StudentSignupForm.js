import React, { useState } from 'react';
import { Alert } from 'react-native';
import firebase from '../../utils/firebase';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { Box, VStack, FormControl, Input, Button, Text } from 'native-base';
import {useNavigation} from "@react-navigation/native";

const StudentSignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const auth = getAuth(firebase);
    const db = getFirestore(firebase);
    const navigation = useNavigation();

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                userType: 'student',
            });

            await sendEmailVerification(user);

            // Display an alert requesting email confirmation
            Alert.alert(
                'Email Verification',
                'A confirmation email has been sent to your email address. Please confirm your email before logging in.',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            // Redirect the user to the Login component
                            navigation.navigate('Login');
                        },
                    },
                ]
            );
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'There was an error during the sign-up process. Please try again.');
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

export default StudentSignupForm;
