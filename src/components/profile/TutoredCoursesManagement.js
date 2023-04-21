import React, { useState, useEffect } from 'react';
import {
    Box,
    VStack,
    FormControl,
    Input,
    Button,
    Text,
    HStack,
    IconButton,
    Icon,
    ScrollView,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import firebase from '../../utils/firebase';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc, getFirestore } from 'firebase/firestore';

const TutoredCourses = () => {
    const [tutoredCourses, setTutoredCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const auth = getAuth(firebase);
    const db = getFirestore(firebase);

    useEffect(() => {
        const fetchCourses = async () => {
            if (auth.currentUser) {
                const userRef = doc(db, 'users', auth.currentUser.uid);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    setTutoredCourses(userDoc.data().tutoredCourses || []);
                }
            }
            setLoading(false);
        };

        fetchCourses();
    }, [auth.currentUser, db]);

    const addCourse = () => {
        setTutoredCourses([...tutoredCourses, { prefix: '', code: '' }]);
    };

    const removeCourse = (index) => {
        setTutoredCourses(tutoredCourses.filter((_, i) => i !== index));
    };

    const updateCourse = (index, field, value) => {
        const newCourses = [...tutoredCourses];
        newCourses[index][field] = field === 'prefix' ? value.toUpperCase() : value;
        setTutoredCourses(newCourses);
    };

    const handleSaveCourses = async () => {
        if (auth.currentUser) {
            try {
                const userRef = doc(db, 'users', auth.currentUser.uid);
                await updateDoc(userRef, { tutoredCourses });
                alert('Courses updated successfully');
            } catch (error) {
                console.log(error);
                alert('There was an error updating the courses');
            }
        }
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView backgroundColor={'white'}>
            <Box flex={1} justifyContent='center' p={4} backgroundColor={'white'}>
                <VStack space={4}>
                    <FormControl>
                        <FormControl.Label>Tutored Courses</FormControl.Label>
                        {tutoredCourses.map((course, index) => (
                            <HStack space={2} alignItems='center' key={index}>
                                <Input
                                    value={course.prefix}
                                    onChangeText={(value) => updateCourse(index, 'prefix', value)}
                                    placeholder='Prefix (e.g., COMP)'
                                    maxLength={4}
                                    width={'50%'}
                                />
                                <Input
                                    value={course.code}
                                    onChangeText={(value) => updateCourse(index, 'code', value)}
                                    placeholder='357'
                                    keyboardType='number-pad'
                                    maxLength={3}
                                    width={'30%'}
                                />
                                {index === tutoredCourses.length - 1 ? (
                                    <IconButton
                                        icon={<Icon as={MaterialIcons} name='add' />}
                                        onPress={addCourse}
                                        width={'10%'}
                                    />
                                ) : (
                                    <IconButton
                                        icon={<Icon as={MaterialIcons} name='remove' />}
                                        onPress={() => removeCourse(index)}
                                        width={'10%'}
                                    />
                                )}
                            </HStack>
                        ))}
                    </FormControl>
                    <Button onPress={handleSaveCourses}>
                        <Text color={'white'}>Save Courses</Text>
                    </Button>
                </VStack>
            </Box>
        </ScrollView>
    );
};

export default TutoredCourses;