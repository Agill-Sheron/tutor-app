import React, { useState } from 'react';
import {ScrollView, Box, VStack, HStack, Text, Pressable, Avatar, Select} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation, useRoute} from "@react-navigation/native";
import {AirbnbRating} from "react-native-ratings";
import {Alert} from "react-native";
import firebase from '../../utils/firebase';
import {
    collection,
    addDoc,
    getFirestore,
} from 'firebase/firestore';
import {getAuth} from "firebase/auth";

const TutorSearchProfile = () => {
    const route = useRoute();
    const tutor = route.params.tutor;
    const navigate = useNavigation();
    const auth = getAuth(firebase);
    const currentUser = auth.currentUser;

    const [date, setDate] = useState(new Date());

    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [isStartTimeSelected, setIsStartTimeSelected] = useState(false);
    const [isEndTimeSelected, setIsEndTimeSelected] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);


    const isValidDateTimeSelection = () => {
        const currentDate = new Date();
        return (
            date >= currentDate &&
            isStartTimeSelected &&
            isEndTimeSelected &&
            endTime > startTime
        );
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const handleTimeChange = (type, event, selectedTime) => {
        if (type === "start") {
            setIsStartTimeSelected(true);
            const currentTime = selectedTime || startTime;
            setStartTime(currentTime);
        } else if (type === "end") {
            setIsEndTimeSelected(true);
            const currentTime = selectedTime || endTime;
            setEndTime(currentTime);
        }
    };

    const calculateTotalFee = () => {
        const sTime = new Date(startTime);
        const eTime = new Date(endTime);
        eTime.setMinutes(eTime.getMinutes());


        const timeDifference = (eTime - sTime) / (1000 * 60 * 60);


        const hourlyRate = parseFloat(tutor.hourlyRate.replace(/[^0-9.]+/g, ''));


        const totalFee = hourlyRate * timeDifference;

        return totalFee.toFixed(2);
    };

    const createTutoringSession = async (tutor, startTime, endTime, totalFee) => {
        const db = getFirestore(firebase);
        const tutoringSessionsRef = collection(db, 'tutoringSessions');

        try {
            const tutoringSession = {
                tutorId: tutor.id,
                studentId: currentUser.uid,
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString(),
                totalFee: totalFee,
                status: 'pending',
                date: date.toISOString(),
                course: selectedCourse,
                duration: ((endTime - startTime) / (1000 * 60 * 60)).toFixed(2),
                studentName: currentUser.displayName,
                avatarUrl: currentUser.photoURL,
            };
            const docRef = await addDoc(tutoringSessionsRef, tutoringSession);
            console.log('Tutoring session created with ID:', docRef.id);
        } catch (e) {
            console.error('Error adding tutoring session:', e);
        }
    };

    const sendTutoringSession = () => {
        const totalFee = calculateTotalFee();

        Alert.alert(
            'Confirm Payment',
            `Total Fee: ${totalFee}\n\nAre you sure you want to proceed with the payment and send the tutoring session?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Tutoring session canceled'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        console.log('Payment confirmed');
                        createTutoringSession(tutor, startTime, endTime, totalFee);
                        navigate.navigate('StudentDashboard');
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <ScrollView>
            <Box p={4} mt={10}>
                <VStack space={4}>
                    <HStack alignItems="center">
                        <Avatar
                            size="md"
                            source={{
                                uri: tutor.avatarUrl,
                            }}
                        />
                        <HStack width={"80%"} alignItems={"flex-start"} justifyContent={"space-between"}>
                            <VStack ml={4} space={1} alignItems={'flex-start'}>
                                <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                                    {tutor.firstName} {tutor.lastName}
                                </Text>
                                <AirbnbRating
                                    count={5}
                                    defaultRating={tutor.rating}
                                    size={10}
                                    isDisabled
                                    showRating={false}
                                />
                            </VStack>
                            <VStack ml={4} space={2} alignItems={"flex-start"} justifyContent={'flex-start'} >
                                <Text fontSize="xl" fontWeight="bold" color="emerald.600">
                                    {tutor.hourlyRate ? `$${tutor.hourlyRate}/hr` : 'N/A'}
                                </Text>
                            </VStack>
                        </HStack>

                    </HStack>
                    <HStack width={"80%"} alignItems={"center"} justifyContent={"space-between"}>
                        <VStack ml={4} space={1}>
                            <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                                Tutored Courses
                            </Text>
                            <Text fontSize="xs" color="coolGray.700">
                                {tutor.tutoredCourses.map(({ prefix, code }) => `${prefix}-${code}`).join(', ')}
                            </Text>
                        </VStack>
                    </HStack>
                    <Pressable>
                        <Box
                            bg={'coolGray.100'}
                            p={5}
                            rounded={8}
                            borderWidth={1}
                            borderColor="coolGray.300"
                            shadow={3}
                        >
                            <HStack alignItems={"center"} justifyContent={"flex-start"}>
                                <Text width={"40%"} fontSize="sm" fontWeight="medium" color="coolGray.800">
                                    Select Course:
                                </Text>
                                <Select
                                    width={"300%"}
                                    height={30}
                                    placeholder="Select course"
                                    value={selectedCourse}
                                    onValueChange={(itemValue) => setSelectedCourse(itemValue)}
                                >
                                    {tutor.tutoredCourses.map(({ prefix, code }) => (
                                        <Select.Item key={`${prefix}-${code}`} label={`${prefix}-${code}`} value={`${prefix}-${code}`} />
                                    ))}
                                </Select>
                            </HStack>
                        </Box>
                    </Pressable>
                    <Pressable>
                        <Box
                            bg={'coolGray.100'}
                            p={5}
                            rounded={8}
                            borderWidth={1}
                            borderColor="coolGray.300"
                            shadow={3}
                        >
                            <HStack alignItems={"center"} justifyContent={"flex-start"}>
                                <Text  width={"30%"} fontSize="sm" fontWeight="medium" color="coolGray.800">
                                    Select Date:
                                </Text>
                                <DateTimePicker
                                    width={"50%"}
                                    height={30}
                                    value={date}
                                    mode="date"
                                    display="default"
                                    minimumDate={new Date()}
                                    onChange={handleDateChange}
                                />
                            </HStack>

                        </Box>

                    </Pressable>

                    <Pressable>
                            <Box
                                bg={'coolGray.100'}
                                p={5}
                                rounded={8}
                                borderWidth={1}
                                borderColor="coolGray.300"
                                shadow={3}
                            >
                                <HStack alignItems={"center"} justifyContent={"flex-start"} space={2}>
                                    <Text width={"30%"} fontSize="sm" fontWeight="medium" color="coolGray.800">
                                        Select Time:
                                    </Text>
                                    <DateTimePicker
                                        width={"30%"}
                                        height={30}
                                        value={startTime}
                                        mode="time"
                                        display="default"
                                        onChange={(event, selectedTime) =>
                                            handleTimeChange("start", event, selectedTime)
                                        }
                                    />
                                    <Text fontSize="sm" fontWeight="medium" color="coolGray.800">
                                        to
                                    </Text>
                                    <DateTimePicker
                                        width={"30%"}
                                        height={30}
                                        value={endTime}
                                        mode="time"
                                        display="default"
                                        onChange={(event, selectedTime) =>
                                            handleTimeChange("end", event, selectedTime)
                                        }
                                    />
                                </HStack>
                            </Box>
                    </Pressable>
                    <Box
                        bg={'coolGray.100'}
                        p={5}
                        rounded={8}
                        borderWidth={1}
                        borderColor="coolGray.300"
                        shadow={3}
                    >
                        <VStack space={2}>
                            <HStack>
                                <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                                    Session Recap
                                </Text>
                            </HStack>
                            <HStack alignItems={'flex-start'} justifyContent={'space-between'} space={4}>
                                <VStack space={2}>
                                    <Text fontSize="sm" color="coolGray.700">
                                        Date: {date.toLocaleDateString()}
                                    </Text>
                                    <Text fontSize="sm" color="coolGray.700">
                                        Start Time: {startTime.toLocaleTimeString()}
                                    </Text>
                                    <Text fontSize="sm" color="coolGray.700">
                                        End Time: {endTime.toLocaleTimeString()}
                                    </Text>
                                </VStack>
                                <VStack space={2}>
                                    <Text fontSize="sm" color="coolGray.700">
                                        Duration: {((endTime - startTime) / (60 * 60 * 1000)).toFixed(2)} hours
                                    </Text>
                                    <Text fontSize="sm" color="coolGray.700">
                                        Total Fee: $
                                        {calculateTotalFee()}
                                    </Text>
                                </VStack>
                            </HStack>
                        </VStack>
                    </Box>
                    <Pressable onPress={sendTutoringSession} disabled={!isValidDateTimeSelection()}>
                        {({ isPressed, isDisabled }) => (
                            <Box
                                bg={
                                    isPressed
                                        ? "coolGray.200"
                                        : isDisabled
                                            ? "coolGray.300"
                                            : "coolGray.100"
                                }
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
                                        color={isDisabled ? "coolGray.500" : "coolGray.800"}
                                    >
                                        Send Request
                                    </Text>
                                    <Ionicons
                                        name="send"
                                        size={24}
                                        color={isDisabled ? "coolGray.500" : "blue"}
                                    />
                                </HStack>
                            </Box>
                        )}
                    </Pressable>
                </VStack>
            </Box>
        </ScrollView>
    );
};

export default TutorSearchProfile;