import React, { useState, useEffect } from 'react';
import { ScrollView, Box, VStack, HStack, Text, Pressable, Avatar } from 'native-base';
import { SearchBar } from 'react-native-elements';
import { AirbnbRating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../utils/firebase';
import { collection, getDocs, query, where, getFirestore } from 'firebase/firestore';

const SearchTutor = () => {
    const [search, setSearch] = useState('');
    const [tutors, setTutors] = useState([]);
    const navigation = useNavigation();
    const db = getFirestore(firebase);

    useEffect(() => {
        const fetchTutors = async () => {
            const tutorsRef = collection(db, 'users');
            const tutorQuery = query(tutorsRef, where('userType', '==', 'tutor'));
            const tutorSnapshot = await getDocs(tutorQuery);
            const tutorData = tutorSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTutors(tutorData);
        };
        fetchTutors();
    }, []);

    const handleTutorSearchPress = (tutor) => {
        navigation.navigate('TutorSearchProfile', { tutor });
    };

    const filteredTutors = tutors.filter((tutor) => {
        return tutor.tutoredCourses.some(({ prefix, code }) => {
            const course = `${prefix}-${code}`.toLowerCase();
            return course.includes(search.toLowerCase());
        });
    });

    return (
        <ScrollView>
            <Box p={4} mt={5}>
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
                                    <HStack alignItems="center">
                                        <Avatar
                                            size="md"
                                            source={{
                                                uri: tutor.avatarUrl,
                                            }}
                                        />
                                        <VStack ml={4} space={1} width={"40%"}>
                                            <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                                                {tutor.firstName} {tutor.lastName}
                                            </Text>
                                        </VStack>
                                        <VStack ml={10} space={1} alignItems={'flex-end'} justifyContent={'flex-end'}>
                                            <Text fontSize="md" fontWeight="bold" color="emerald.600">
                                                {tutor.hourlyRate ? `${tutor.hourlyRate}/hr` : 'N/A'}
                                            </Text>
                                            <AirbnbRating
                                                count={5}
                                                defaultRating={tutor.rating || 0}
                                                size={10}
                                                isDisabled
                                                showRating={false}
                                            />
                                        </VStack>
                                    </HStack>
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
