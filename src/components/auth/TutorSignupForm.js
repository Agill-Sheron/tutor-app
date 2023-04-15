import React, { useState } from 'react';
import { Alert } from 'react-native';
import firebase from '../../utils/firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {
    Box,
    VStack,
    FormControl,
    Input,
    Button,
    Text,
    Select,
    CheckIcon,
    TextArea,
} from 'native-base';

const fieldsOfStudy = [
    'Computer Science',
    'Software Engineering',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Civil Engineering',
    'Physics',
    'Chemistry',
    'Mathematics',
    'Biology',
    'Psychology',
    'Economics',
    'Political Science',
    'Philosophy',
    'History',
    'Literature',
    'Fine Arts',
];

const TutorSignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fieldOfStudy, setFieldOfStudy] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [tutoredCourses, setTutoredCourses] = useState('');


    const auth = getAuth(firebase);
    const handleSignup = async () => {
        if (password === confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Save additional fields to the database in the user's profile or a separate collection
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
        } else {
            Alert.alert('Error', 'Passwords do not match');
        }
    };


    return (
        <Box flex={1} justifyContent="center" p={4} backgroundColor={'white'}>
            <VStack space={4}>
                <FormControl>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Confirm Password</FormControl.Label>
                    <Input
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        autoCapitalize="none"
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Field of Study</FormControl.Label>
                    <Select
                        selectedValue={fieldOfStudy}
                        minWidth={200}
                        accessibilityLabel="Field of Study"
                        placeholder="Select a field of study"
                        onValueChange={(itemValue) => setFieldOfStudy(itemValue)}
                        _selectedItem={{
                            bg: 'cyan.600',
                            endIcon: <CheckIcon size={4} />,
                        }}
                    >
                        {fieldsOfStudy.map((field, index) => (
                            <Select.Item key={index} label={field} value={field} />
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <FormControl.Label>Years of Experience</FormControl.Label>
                    <Input
                        value={yearsOfExperience}
                        onChangeText={setYearsOfExperience}
                        keyboardType="number-pad"
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Tutored Courses</FormControl.Label>
                    <TextArea
                        h={20}
                        placeholder="Enter courses (e.g., comp-353, soen-357)"
                        value={tutoredCourses}
                        onChangeText={setTutoredCourses}
                    />
                </FormControl>
                <Button onPress={handleSignup}>
                    <Text color={'white'}>Sign Up</Text>
                </Button>
            </VStack>
        </Box>
    );
};

export default TutorSignupForm;