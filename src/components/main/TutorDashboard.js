import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    Box,
    VStack,
    HStack,
    Text,
    Skeleton,
    Pressable,
    Avatar,
} from 'native-base';

import { useNavigation } from '@react-navigation/native';

const TutorDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState([]);
    const [requests, setRequests] = useState([]);

    const navigation = useNavigation();

    const handleAppointmentPress = (appointment) => {
        navigation.navigate('TutorAppointment', { appointment });
    };

    const handleRequestPress = (request) => {
        navigation.navigate('TutorRequest', { request });
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            setAppointments([
                {
                    id: 1,
                    studentName: 'John Doe',
                    avatarUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
                    date: 'Apr 20, 2023',
                    startTime: '10:00',
                    endTime: '11:00',
                    course: 'MATH 101',
                },
                {
                    id: 2,
                    studentName: 'Jane Smith',
                    avatarUrl: 'https://randomuser.me/api/portraits/women/15.jpg',
                    date: 'Apr 22, 2023',
                    startTime: '14:00',
                    endTime: '15:30',
                    course: 'CHEM 201',
                },
            ]);
            setRequests([
                {
                    id: 1,
                    studentName: 'Michael Johnson',
                    avatarUrl: 'https://randomuser.me/api/portraits/men/20.jpg',
                    date: 'Apr 25, 2023',
                    startTime: '14:00',
                    endTime: '15:30',
                    course: 'PHYS 110',
                    duration: '1h 30m',
                    earnings: '$30',
                },
                {
                    id: 2,
                    studentName: 'Sara Brown',
                    avatarUrl: 'https://randomuser.me/api/portraits/women/25.jpg',
                    date: 'Apr 28, 2023',
                    startTime: '14:00',
                    endTime: '15:30',
                    course: 'BIOL 120',
                    duration: '1h',
                    earnings: '$20',
                },
            ]);
        }, 2000);
    }, []);

    return (
        <ScrollView>
            <Box p={4}>
                <VStack space={4}>
                    <Text fontSize="2xl" fontWeight="bold">
                        Upcoming Appointments
                    </Text>
                    <VStack space={2}>
                        {loading
                            ? Array.from({ length: 2 }).map((_, i) => (
                                <Skeleton key={i} height={10} mt={2} />
                            ))
                            : appointments.map((appointment) => (
                                <Pressable
                                    key={appointment.id}
                                    onPress={() => handleAppointmentPress(appointment)}
                                >
                                    {({ isPressed }) => (
                                        <Box
                                            bg={isPressed ? 'coolGray.200' : 'coolGray.100'}
                                            p={5}
                                            rounded={8}
                                            borderWidth={1}
                                            borderColor="coolGray.300"
                                            shadow={3}
                                        >
                                            <HStack alignItems="center">
                                                <Avatar
                                                    size="md"
                                                    source={{
                                                        uri: appointment.avatarUrl,
                                                    }}
                                                />
                                                <VStack ml={4} space={1}>
                                                    <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                                                        {appointment.studentName}
                                                    </Text>
                                                    <Text fontSize="xs" color="coolGray.700">
                                                        {appointment.course}
                                                    </Text>
                                                </VStack>
                                                <VStack ml={10} space={1}>
                                                    <Text fontSize="xs" color="coolGray.800">
                                                        {appointment.startTime} - {appointment.endTime}
                                                    </Text>
                                                    <Text fontSize="xs" color="coolGray.800">
                                                        {appointment.date}
                                                    </Text>
                                                </VStack>
                                            </HStack>
                                         </Box>
                                        )}
                                </Pressable>
                            ))}
                    </VStack>
                    <Text fontSize="2xl" fontWeight="bold" mt={6}>
                        New Requests
                    </Text>
                    <VStack space={2}>
                        {loading
                            ? Array.from({ length: 2 }).map((_, i) => (
                                <Skeleton key={i} height={10} mt={2} />
                            ))
                            : requests.map((request) => (
                                <Pressable
                                    key={request.id}
                                    onPress={() => handleRequestPress(request)}
                                >
                                    {({ isPressed }) => (
                                        <Box
                                            bg={isPressed ? 'coolGray.200' : 'coolGray.100'}
                                            p={5}
                                            rounded={8}
                                            borderWidth={1}
                                            borderColor="coolGray.300"
                                            shadow={3}
                                        >
                                            <HStack alignItems="center" justifyContent={"flex-start"} >
                                                <Avatar
                                                    size="md"
                                                    source={{
                                                        uri: request.avatarUrl,
                                                    }}
                                                />
                                                <VStack width={"80%"}>
                                                    <HStack alignItems="center" justifyContent={"space-between"} >
                                                        <VStack ml={4} space={1}>
                                                            <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                                                                {request.studentName}
                                                            </Text>
                                                            <Text fontSize="xs" color="coolGray.700">
                                                                {request.course}
                                                            </Text>
                                                        </VStack>
                                                        <VStack ml={4} space={1}>
                                                            <Text fontSize="xs" color="coolGray.800">
                                                                {request.startTime} - {request.endTime}
                                                            </Text>
                                                            <Text fontSize="xs" color="coolGray.800">
                                                                {request.date}
                                                            </Text>
                                                        </VStack>
                                                    </HStack>
                                                    <HStack  alignItems="center" justifyContent={"space-between"} ml={4} space={10}>
                                                        <Text fontSize="xs" color="coolGray.800">
                                                            Duration: {request.duration}
                                                        </Text>
                                                        <Text fontSize="md" fontWeight="bold" color="emerald.600">
                                                            {request.earnings}
                                                        </Text>
                                                    </HStack>
                                                </VStack>

                                            </HStack>
                                        </Box>
                                    )}
                                </Pressable>
                            ))}
                    </VStack>
                </VStack>
            </Box>
        </ScrollView>
    );
};

export default TutorDashboard;