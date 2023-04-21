import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import {
    Box,
    VStack,
    FormControl,
    Input,
    Button,
    Text, ScrollView,
} from 'native-base';
import firebase from '../../utils/firebase';
import { getAuth, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';

const StudentProfileManagement = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');

    const auth = getAuth(firebase);
    const db = getFirestore(firebase);

    useEffect(() => {
        const fetchUserData = async () => {
            if (auth.currentUser) {
                setEmail(auth.currentUser.email);
                setFirstName(auth.currentUser.displayName.split(' ')[0]);
                setLastName(auth.currentUser.displayName.split(' ')[1]);

                const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setPhoneNumber(userData.phoneNumber || '');
                    setCreditCardNumber(userData.creditCardNumber || '');
                    setExpiryDate(userData.expiryDate || '');
                    setCvc(userData.cvc || '');
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

            await setDoc(doc(db, "users", auth.currentUser.uid), {
                phoneNumber: phoneNumber,
                creditCardNumber: creditCardNumber,
                expiryDate: expiryDate,
                cvc: cvc,
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
        <ScrollView>
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
                    <FormControl>
                        <FormControl.Label>Credit Card Number</FormControl.Label>
                        <Input
                            value={creditCardNumber}
                            onChangeText={setCreditCardNumber}
                            keyboardType="number-pad"
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Expiry Date (MM/YY)</FormControl.Label>
                        <Input
                            value={expiryDate}
                            onChangeText={setExpiryDate}
                            keyboardType="number-pad"
                            maxLength={5}
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>CVC</FormControl.Label>
                        <Input
                            value={cvc}
                            onChangeText={setCvc}
                            keyboardType="number-pad"
                            maxLength={3}
                        />
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
        </ScrollView>
    );
};

export default StudentProfileManagement;