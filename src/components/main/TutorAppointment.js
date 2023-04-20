import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {
    VStack,
    HStack,
    IconButton,
    Text,
    Avatar,
    Box, Pressable,
} from 'native-base';
import {Alert} from "react-native";

const TutorAppointment = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const appointment = route.params.appointment;

    const handleCancelAppointment = () => {
        Alert.alert(
            'Cancel Appointment',
            'Are you sure you want to cancel this appointment? You will lose earnings.',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Confirm', onPress: () => console.log('Confirmed') },
            ],
            { cancelable: false }
        );
    };

    const handleMessageStudent = () => {
        Alert.alert(
            'Messaging Feature',
            'The messaging feature will be available in our next release.',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
        );
    };
    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <VStack flex={1} alignItems="center" justifyContent="center">
            <Pressable width={"90%"} >
                <Box
                    bg={'coolGray.100'}
                    p={5}
                    rounded={8}
                    borderWidth={1}
                    borderColor="coolGray.300"
                    shadow={3}
                >
                    <VStack width={"100%"}>
                        <HStack width={"100%"} alignItems={"center"} justifyContent={"space-between"}>
                            <Avatar source={{ uri: appointment.avatarUrl }} size="lg" />
                            <VStack alignItems="flex-end">
                                <Text fontWeight="bold" fontSize="lg">
                                    {appointment.studentName}
                                </Text>
                                <Text fontWeight="medium" fontSize="sm">
                                    {appointment.course}
                                </Text>
                                <Text fontSize="xs" color="coolGray.600">
                                    {appointment.date}
                                </Text>
                                <Text fontSize="xs" color="coolGray.600">
                                    {appointment.startTime} to{' '}
                                    {appointment.endTime}
                                </Text>
                            </VStack>
                        </HStack>
                        <HStack
                            alignItems={'center'}
                            justifyContent={'center'}
                            space={4}
                            mt={4}
                        >
                            <IconButton
                                onPress={handleGoBack}
                                icon={<Ionicons name="arrow-back" size={24} />}
                            />
                            <IconButton
                                onPress={handleCancelAppointment}
                                icon={<Ionicons name="close-circle" size={24} color="red" />}
                                rounded="full"
                            />
                            <IconButton
                                onPress={handleMessageStudent}
                                icon={<Ionicons name="chatbubble" size={24} />}
                                rounded="full"
                            />
                        </HStack>
                    </VStack>
                </Box>

            </Pressable>

        </VStack>
    );
};

export default TutorAppointment;
