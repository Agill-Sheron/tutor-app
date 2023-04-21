import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import {
    Box,
    VStack,
    FormControl,
    Text,
    Button,
    HStack,
    ScrollView,
} from 'native-base';
import firebase from '../../utils/firebase';
import { getAuth } from 'firebase/auth';
import {doc, getDoc, getFirestore, updateDoc} from 'firebase/firestore';
import DatePicker from 'react-native-datepicker';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const TutorAvailabilityManagement = () => {
    const [availabilities, setAvailabilities] = useState({});

    const auth = getAuth(firebase);
    const db = getFirestore(firebase);

    useEffect(() => {
        const fetchAvailabilities = async () => {
            try {
                const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
                const userData = userDoc.data();
                if (userData.availabilities) {
                    setAvailabilities(userData.availabilities);
                }
            } catch (error) {
                console.error('Error fetching availabilities:', error);
            }
        };

        if (auth.currentUser) {
            fetchAvailabilities();
        }
    }, [auth.currentUser, db]);
    const handleSaveAvailabilities = async () => {
        try {
            const userRef = doc(db, 'users', auth.currentUser.uid);
            await updateDoc(userRef, {
                availabilities: availabilities,
            });
            Alert.alert('Success', 'Availabilities updated successfully');
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'There was an error updating your availabilities');
        }
    };

    const updateAvailability = (day, startOrEnd, value) => {
        const newAvailabilities = { ...availabilities };
        if (!newAvailabilities[day]) {
            newAvailabilities[day] = { start: '', end: '' };
        }
        newAvailabilities[day][startOrEnd] = value;
        setAvailabilities(newAvailabilities);
    };

    return (
        <ScrollView backgroundColor={'white'}>
            <Box flex={1} justifyContent='center' p={4} backgroundColor={'white'}>
                <VStack space={4} alignItems={'center'}>
                    {daysOfWeek.map((day, index) => (
                        <FormControl key={index}>
                            <FormControl.Label>{day}</FormControl.Label>
                            <HStack space={2} alignItems='center' justifyContent={"center"}>
                                <DatePicker
                                    style={{ width: '45%' }}
                                    date={availabilities[day]?.start || ''}
                                    mode='time'
                                    placeholder='Start time'
                                    format='HH:mm'
                                    confirmBtnText='Confirm'
                                    cancelBtnText='Cancel'
                                    showIcon={false}
                                    customStyles={{
                                        dateInput: {
                                            borderColor: 'gray',
                                            borderWidth: 1,
                                            borderRadius: 5,
                                        },
                                    }}
                                    onDateChange={(value) =>
                                        updateAvailability(day, 'start', value)
                                    }
                                />
                                <DatePicker
                                    style={{ width: '45%' }}
                                    date={availabilities[day]?.end || ''}
                                    mode='time'
                                    placeholder='End time'
                                    format='HH:mm'
                                    confirmBtnText='Confirm'
                                    cancelBtnText='Cancel'
                                    showIcon={false}
                                    customStyles={{
                                        dateInput: {
                                            borderColor: 'gray',
                                            borderWidth: 1,
                                            borderRadius: 5,
                                        },
                                    }}
                                    onDateChange={(value) =>
                                        updateAvailability(day, 'end', value)
                                    }
                                />
                            </HStack>
                        </FormControl>
                    ))}
                    <Button onPress={handleSaveAvailabilities}>
                        <Text color={'white'}>Save Availabilities</Text>
                    </Button>
                </VStack>
            </Box>
        </ScrollView>
    );
};

export default TutorAvailabilityManagement;

