import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import {
    Box,
    VStack,
    FormControl,
    Input,
    Button,
    Text,
    Divider, Pressable, HStack,
} from 'native-base';
import firebase from '../../utils/firebase';
import { getAuth, updateProfile } from 'firebase/auth';
import {getDoc, doc, updateDoc, getFirestore} from 'firebase/firestore';
import {Ionicons} from "@expo/vector-icons";

const Payments = () => {
    const [earnings, setEarnings] = useState(0);
    const [payments, setPayments] = useState([]);
    const [paypalEmail, setPaypalEmail] = useState('');

    const auth = getAuth(firebase);
    const db = getFirestore(firebase);

    // Add this code inside the useEffect of the Payments component

    const mockEarnings = 1250.00;
    const mockPayments = [
        {
            id: 'payment1',
            date: '2023-04-01',
            amount: 500.00,
        },
        {
            id: 'payment2',
            date: '2023-04-08',
            amount: 450.00,
        },
        {
            id: 'payment3',
            date: '2023-04-15',
            amount: 300.00,
        },
    ];


    useEffect(() => {
        const fetchPaymentData = async () => {
            try {
                const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
                const userData = userDoc.data();
                if (true) {
                    setEarnings(mockEarnings);
                }
                if (true) {
                    setPayments(mockPayments);
                }
            } catch (error) {
                console.error('Error fetching payment data:', error);
            }
        };

        if (auth.currentUser) {
            fetchPaymentData();
        }
    }, [auth.currentUser, db]);

    const handleUpdatePaypalEmail = async () => {
        try {
            await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                paypalEmail: paypalEmail,
            });
            Alert.alert('Success', 'PayPal email updated successfully');
        } catch (error) {
            console.error('Error updating PayPal email:', error);
            Alert.alert('Error', 'There was an error updating your PayPal email');
        }
    };

    return (
        <Box flex={1} justifyContent="center" p={4} backgroundColor={'white'}>
            <VStack space={4}>
                <Text fontSize="xl">Total earnings: ${earnings.toFixed(2)}</Text>
                <Text fontSize="xl">Payments:</Text>
                {payments.map((payment, index) => (
                    <Pressable key={index}>
                        <Box
                            bg={"coolGray.100"}
                            p={5}
                            rounded={8}
                            borderWidth={1}
                            borderColor="coolGray.300"
                            shadow={3}
                        >
                            <HStack alignItems="center" justifyContent="space-between">
                                <VStack alignItems="flex-start">
                                    <Text fontWeight={'semibold'}>
                                        Date
                                    </Text>
                                    <Text>
                                        {payment.date}
                                    </Text>
                                </VStack>
                                <VStack alignItems="flex-end">
                                    <Text fontWeight={'semibold'}>
                                        Amount
                                    </Text>
                                    <Text fontSize={"sm"}>
                                        ${payment.amount.toFixed(2)}
                                    </Text>
                                </VStack>
                            </HStack>
                        </Box>
                    </Pressable>

                ))}
                <Divider my={4} />
                <Pressable>
                        <Box
                            bg={"coolGray.100"}
                            p={5}
                            rounded={8}
                            borderWidth={1}
                            borderColor="coolGray.300"
                            shadow={3}
                        >
                            <HStack alignItems="center" justifyContent="space-between">
                                <Text
                                    fontSize="md"
                                    fontWeight="medium"
                                    color={ "coolGray.800"}
                                >
                                    Paypal account connected
                                </Text>
                                <Ionicons
                                    name="checkmark-circle"
                                    size={24}
                                    color={"green"}
                                />
                            </HStack>
                        </Box>
                </Pressable>

            </VStack>
        </Box>
    );
};

export default Payments;
