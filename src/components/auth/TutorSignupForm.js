import React, { useState } from 'react';
import { Alert } from 'react-native';
import firebase from '../../utils/firebase';
import {getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile} from 'firebase/auth';
import {
    Box,
    VStack,
    FormControl,
    Input,
    Button,
    Text,
    Select,
    CheckIcon,
    HStack, IconButton, Icon, ScrollView,
} from 'native-base';
import {doc, getFirestore, setDoc} from "firebase/firestore";
import {MaterialIcons} from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';


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

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fieldOfStudy, setFieldOfStudy] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [tutoredCourses, setTutoredCourses] = useState([{ prefix: '', code: '' }]);


    const auth = getAuth(firebase);
    const db = getFirestore(firebase);
    const navigation = useNavigation();


    const addCourse = () => {
        setTutoredCourses([...tutoredCourses, { prefix: '', code: '' }]);
    };

    const removeCourse = (index) => {
        setTutoredCourses(tutoredCourses.filter((_, i) => i !== index));
    };

    const updateCourse = (index, field, value) => {
        const newCourses = [...tutoredCourses];
        newCourses[index][field] = field === 'prefix' ? value.toUpperCase() : value;;
        setTutoredCourses(newCourses);
    };


    const handleSignup = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: `${firstName} ${lastName}`,
            });

            await setDoc(doc(db, "users", user.uid), {
                userType: 'tutor',
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                fieldOfStudy: fieldOfStudy,
                yearsOfExperience: yearsOfExperience,
                tutoredCourses: tutoredCourses,
            });

            await sendEmailVerification(user);

            Alert.alert(
                'Email Verification',
                'A confirmation email has been sent to your email address. Please confirm your email before logging in.',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            // Redirect the user to the Login component
                            navigation.navigate('Login');
                        },
                    },
                ]
            );

        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'There was an error during the sign-up process. Please try again.');
        }
    };


    return (
        <ScrollView backgroundColor={"white"}>
            <Box flex={1} justifyContent="center" p={4} backgroundColor={'white'}>
                <VStack space={4}>
                    <FormControl>
                        <FormControl.Label>First Name</FormControl.Label>
                        <Input
                            value={firstName}
                            onChangeText={setFirstName}
                            autoCapitalize="words"
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Last Name</FormControl.Label>
                        <Input
                            value={lastName}
                            onChangeText={setLastName}
                            autoCapitalize="words"
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Phone Number</FormControl.Label>
                        <Input
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            keyboardType="phone-pad"
                        />
                    </FormControl>
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
                        {tutoredCourses.map((course, index) => (
                            <HStack space={2} alignItems="center" key={index}>
                                <Input
                                    value={course.prefix}
                                    onChangeText={(value) => updateCourse(index, 'prefix', value)}
                                    placeholder="Prefix (e.g., COMP)"
                                    maxLength={4}
                                    width={"50%"}
                                />
                                <Input
                                    value={course.code}
                                    onChangeText={(value) => updateCourse(index, 'code', value)}
                                    placeholder="Code (e.g., 357)"
                                    keyboardType="number-pad"
                                    maxLength={3}
                                    width={"30%"}
                                />
                                {index === tutoredCourses.length - 1 ? (
                                    <IconButton
                                        icon={<Icon as={MaterialIcons} name="add" />}
                                        onPress={addCourse}
                                        width={"10%"}
                                    />
                                ) : (
                                    <IconButton
                                        icon={<Icon as={MaterialIcons} name="remove" />}
                                        onPress={() => removeCourse(index)}
                                        width={"10%"}
                                    />
                                )}
                            </HStack>
                        ))}
                    </FormControl>
                    <Button onPress={handleSignup}>
                        <Text color={'white'}>Sign Up</Text>
                    </Button>
                </VStack>
            </Box>
        </ScrollView>
    );
};

export default TutorSignupForm;