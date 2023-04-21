import React, { useState } from 'react';
import { ScrollView, Box, VStack, HStack, Text, Pressable, Avatar } from 'native-base';
import { SearchBar } from 'react-native-elements';
import { AirbnbRating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';

const SearchTutor = () => {
    const [search, setSearch] = useState('');
    const navigation = useNavigation();

    // Mock data for tutors. Replace this with API data.
    const tutors = [
        {
            id: 1,
            name: 'John Doe',
            avatarUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
            courses: ['SOEN-357', 'COMP-232'],
            hourlyRate: '$30',
            rating: 4.5,
        },
        {
            id: 2,
            name: 'Jane Smith',
            avatarUrl: 'https://randomuser.me/api/portraits/women/15.jpg',
            courses: ['MATH-101', 'CHEM-201'],
            hourlyRate: '$35',
            rating: 5,
        },
        {
            id: 3,
            name: 'Michael Johnson',
            avatarUrl: 'https://randomuser.me/api/portraits/men/20.jpg',
            courses: ['PHYS-110', 'MATH-205'],
            hourlyRate: '$25',
            rating: 4,
        },
        {
            id: 4,
            name: 'Sara Brown',
            avatarUrl: 'https://randomuser.me/api/portraits/women/25.jpg',
            courses: ['BIOL-120', 'CHEM-101'],
            hourlyRate: '$40',
            rating: 4.8,
        },
        {
            id: 5,
            name: 'William Smith',
            avatarUrl: 'https://randomuser.me/api/portraits/men/30.jpg',
            courses: ['COMP-248', 'ENGR-213'],
            hourlyRate: '$45',
            rating: 5,
        },
        {
            id: 6,
            name: 'Elizabeth Taylor',
            avatarUrl: 'https://randomuser.me/api/portraits/women/35.jpg',
            courses: ['MATH-203', 'COMP-352'],
            hourlyRate: '$50',
            rating: 4.7,
        },
    ];


    const handleTutorSearchPress = (tutor) => {
        // Handle the tutor press event here, e.g., navigate to TutorSearchProfile with tutor data
        navigation.navigate('TutorSearchProfile', { tutor });
    };

    const filteredTutors = tutors.filter((tutor) => {
        return tutor.courses.some((course) => course.toLowerCase().includes(search.toLowerCase()));
    });

    return (
        <ScrollView>
            <Box p={4} mt={10}>
                <VStack space={4}>
                    <SearchBar
                        placeholder="Course name e.g. SOEN-357"
                        onChangeText={setSearch}
                        value={search}
                        round
                        containerStyle={{
                            backgroundColor: 'transparent',
                            borderBottomWidth: 0,
                            borderTopWidth: 0,
                        }}
                        inputContainerStyle={{
                            backgroundColor: 'transparent',
                            borderColor: '#862c3a',
                            borderWidth: 1,
                            borderBottomWidth: 1,
                        }}
                        inputStyle={{
                            color: 'coolGray.800',
                        }}
                        iconS
                        clearIcon
                    />
                    {filteredTutors.map((tutor) => (
                        <Pressable key={tutor.id} onPress={() => handleTutorSearchPress(tutor)}>
                            {({ isPressed }) => (
                                <Box
                                    bg={isPressed ? 'coolGray.200' : 'coolGray.100'}
                                    p={5}
                                    rounded={8}
                                    borderWidth={1}
                                    borderColor="coolGray.300"
                                    shadow={3}
                                >
                                    <VStack>
                                        <HStack alignItems="center">
                                            <Avatar
                                                size="md"
                                                source={{
                                                    uri: tutor.avatarUrl,
                                                }}
                                            />
                                            <VStack ml={4} space={1}>
                                                <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                                                    {tutor.name}
                                                </Text>
                                                <Text fontSize="xs" color="coolGray.700">
                                                    {tutor.courses.join(', ')}
                                                </Text>
                                            </VStack>
                                            <VStack ml="auto" alignItems="flex-end" space={1}>
                                                <Text fontSize="md" fontWeight="bold" color="emerald.600">
                                                    {tutor.hourlyRate}/hr
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
                                        <HStack alignItems={"center"} justifyContent={"flex-end"}>

                                        </HStack>
                                    </VStack>
                                </Box>
                            )}
                        </Pressable>
                    ))}
                </VStack>
            </Box>
        </ScrollView>
    );
};

export default SearchTutor;
