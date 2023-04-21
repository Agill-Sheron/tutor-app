import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import {
    Box,
    VStack,
    FormControl,
    Input,
    Button,
    Text,
} from 'native-base';
import firebase from '../../utils/firebase';
import { getAuth, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';

const TutorProfileManagement = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const auth = getAuth(firebase);
    const db = getFirestore(firebase);

    useEffect(() => {
        const fetchUserData = async () => {
            if (auth.currentUser) {
                setEmail(auth.currentUser.email);
                setFirstName(auth.currentUser.displayName.split(' ')[0]);
                setLastName(auth.currentUser.displayName.split(' ')[1]);

                // Fetch phone number from Firestore
                const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
                if (userDoc.exists()) {
                    setPhoneNumber(userDoc.data().phoneNumber || '');
                }
            }
        };
        fetchUserData();
    }, [auth.currentUser]);

    const handleUpdateProfile = async () => {
        try {
            await updateProfile(auth.currentUser, {
                displayName: `${firstName} ${lastName}`,
            });

            // Update phone number in Firestore
            await setDoc(doc(db, "users", auth.currentUser.uid), {
                phoneNumber: phoneNumber,
            }, { merge: true });

            Alert.alert('Success', 'Profile updated successfully');
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'There was an error updating your profile');
        }
    };

    const handleSendPasswordResetLink = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert(
                'Success',
                'A password reset link has been sent to your email address'
            );
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'There was an error sending the password reset link');
        }
    };

    return (
        <Box flex={1} justifyContent="center" p={4} backgroundColor={'white'}>
            <VStack space={4}>
                <FormControl>
                    <FormControl.Label>First Name</FormControl.Label>
                    <Input value={firstName} onChangeText={setFirstName} />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Last Name</FormControl.Label>
                    <Input value={lastName} onChangeText={setLastName} />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input value={email} onChangeText={setEmail} />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Phone Number</FormControl.Label>
                    <Input value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />
                </FormControl>
                <Button onPress={handleUpdateProfile}>
                    <Text color={'white'}>Update Profile</Text>
                </Button>
                <Button
                    onPress={handleSendPasswordResetLink}
                    variant="outline"
                    mt={4}
                >
                    <Text>Send Password Reset Link</Text>
                </Button>
            </VStack>
        </Box>
    );
};

export default TutorProfileManagement;