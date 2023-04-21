import React, { useState } from 'react';
import { ScrollView, Box, VStack, HStack, Text, Pressable, Avatar } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useRoute} from "@react-navigation/native";
import {AirbnbRating} from "react-native-ratings";
import {Alert} from "react-native";

const TutorSearchProfile = () => {
    const route = useRoute();
    const tutor = route.params.tutor;


    const [date, setDate] = useState(new Date());

    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [isStartTimeSelected, setIsStartTimeSelected] = useState(false);
    const [isEndTimeSelected, setIsEndTimeSelected] = useState(false);

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

    const sendRequest = () => {

        const totalFee = calculateTotalFee();

        Alert.alert(
            'Confirm Payment',
            `Total Fee: ${totalFee}\n\nAre you sure you want to proceed with the payment and send the request?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Request canceled'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        console.log('Payment confirmed');
                        // Handle sending request to the tutor
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
                        <HStack width={"80%"} alignItems={"center"} justifyContent={"space-between"}>
                            <VStack ml={4} space={1}>
                                <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                                    {tutor.name}
                                </Text>
                                <Text fontSize="xs" color="coolGray.700">
                                    {tutor.courses.join(', ')}
                                </Text>
                            </VStack>
                            <VStack ml={4} space={2} alignItems={"flex-end"} >
                                <Text fontSize="xs" color="coolGray.800">
                                    {tutor.hourlyRate} per hour
                                </Text>
                                <AirbnbRating
                                    count={5}
                                    defaultRating={tutor.rating}
                                    size={10}
                                    isDisabled
                                    showRating={false}
                                />
                            </VStack>
                        </HStack>

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
                                        {(
                                            ((endTime - startTime) / (60 * 60 * 1000)) *
                                            parseFloat(tutor.hourlyRate.slice(1))
                                        ).toFixed(2)}
                                    </Text>
                                </VStack>
                            </HStack>
                        </VStack>
                    </Box>
                    <Pressable onPress={sendRequest} disabled={!isValidDateTimeSelection()}>
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