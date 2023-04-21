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
import {Ionicons} from "@expo/vector-icons";

const StudentDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [upcomingSessions, setUpcomingSessions] = useState([]);
    const [pastSessions, setPastSessions] = useState([]);

    const navigation = useNavigation();

    const handleTutorSearchPress = () => {
        navigation.navigate('TutorSearch');
    };

    const handleSessionPress = (session) => {
        navigation.navigate('StudentSession', { session });
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            setUpcomingSessions([
                {
                    id: 1,
                    tutorName: 'Alice Johnson',
                    avatarUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
                    date: 'Apr 25, 2023',
                    startTime: '14:00',
                    endTime: '15:30',
                    course: 'MATH 101',
                },
                {
                    id: 2,
                    tutorName: 'Bob Smith',
                    avatarUrl: 'https://randomuser.me/api/portraits/men/18.jpg',
                    date: 'Apr 27, 2023',
                    startTime: '10:00',
                    endTime: '11:30',
                    course: 'PHYS 110',
                },
            ]);
            setPastSessions([
                {
                    id: 1,
                    tutorName: 'Catherine Lee',
                    avatarUrl: 'https://randomuser.me/api/portraits/women/20.jpg',
                    date: 'Apr 10, 2023',
                    startTime: '16:00',
                    endTime: '17:00',
                    course: 'CHEM 201',
                },
                {
                    id: 2,
                    tutorName: 'David Brown',
                    avatarUrl: 'https://randomuser.me/api/portraits/men/25.jpg',
                    date: 'Apr 5, 2023',
                    startTime: '10:00',
                    endTime: '12:00',
                    course: 'BIOL 120',
                },
            ]);
        }, 2000);
    }, []);

    return (
        <ScrollView>
            <Box p={4} mt={10}>
                <VStack space={4}>
                    <Pressable onPress={handleTutorSearchPress}>
                        {({ isPressed }) => (
                            <Box
                                bg={isPressed ? 'coolGray.200' : 'coolGray.100'}
                                p={5}
                                rounded={8}
                                borderWidth={1}
                                borderColor="coolGray.300"
                                shadow={3}
                            >
                                <HStack alignItems={"center"} justifyContent={"space-between"}>
                                    <Text fontSize="2xl" fontWeight="bold">
                                        Search Tutors
                                    </Text>
                                    {/*//search icon*/}
                                    <Ionicons name="search" size={35} color="#ab3a4b" />

                                </HStack>

                            </Box>
                        )}
                    </Pressable>
                    <Text fontSize="2xl" fontWeight="bold" mt={6}>
                        Upcoming Sessions
                    </Text>
                    <VStack space={2}>
                        {loading
                            ? Array.from({ length: 2 }).map((_, i) => (
                                <Skeleton key={i} height={10} mt={2} />
                            ))
                            : upcomingSessions.map((session) => (
                                <Pressable
                                    key={session.id}
                                    onPress={() => handleSessionPress(session)}
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
                                                        uri: session.avatarUrl,
                                                    }}
                                                />
                                                <VStack ml={4} space={1}>
                                                    <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                                                        {session.tutorName}
                                                    </Text>
                                                    <Text fontSize="xs" color="coolGray.700">
                                                        {session.course}
                                                    </Text>
                                                </VStack>
                                                <VStack ml={10} space={1}>
                                                    <Text fontSize="xs" color="coolGray.800">
                                                        {session.startTime} - {session.endTime}
                                                    </Text>
                                                    <Text fontSize="xs" color="coolGray.800">
                                                        {session.date}
                                                    </Text>
                                                </VStack>
                                            </HStack>
                                        </Box>
                                    )}
                                </Pressable>
                            ))}
                    </VStack>
                    <Text fontSize="2xl" fontWeight="bold" mt={6}>
                        Past Sessions
                    </Text>
                    <VStack space={2}>
                        {loading
                            ? Array.from({ length: 2 }).map((_, i) => (
                                <Skeleton key={i} height={10} mt={2} />
                            ))
                            : pastSessions.map((session) => (
                                <Pressable
                                    key={session.id}
                                    onPress={() => handleSessionPress(session)}
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
                                                        uri: session.avatarUrl,
                                                    }}
                                                />
                                                <VStack ml={4} space={1}>
                                                    <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                                                        {session.tutorName}
                                                    </Text>
                                                    <Text fontSize="xs" color="coolGray.700">
                                                        {session.course}
                                                    </Text>
                                                </VStack>
                                                <VStack ml={10} space={1}>
                                                    <Text fontSize="xs" color="coolGray.800">
                                                        {session.startTime} - {session.endTime}
                                                    </Text>
                                                    <Text fontSize="xs" color="coolGray.800">
                                                        {session.date}
                                                    </Text>
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

export default StudentDashboard;
