import React, {useContext} from 'react';
import { VStack, Box, Text, Button } from 'native-base';
import {useNavigation, useRoute} from "@react-navigation/native";
import {Alert} from "react-native";
import firebase from '../../utils/firebase';
import { getAuth, deleteUser } from 'firebase/auth';
import {AuthContext} from "../../context/AuthContext";


const TutorAccountSettings = () => {
    const navigation = useNavigation();
    const route = useRoute();
    // const tutor = route.params.tutor;
    const { user, logout } = useContext(AuthContext);

    const auth = getAuth(firebase);

    const handleLogout = () => {
        auth.signOut().then(() => {
            navigation.navigate('Login');
        });
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            'Delete Account',
            'Are you sure you want to delete your account? This action cannot be undone.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteUser(auth.currentUser);
                            navigation.navigate('Login');
                        } catch (error) {
                            console.log(error);
                            Alert.alert('Error', 'There was an error deleting your account.');
                        }
                    },
                },
            ]
        );
    };

    return (
        <Box flex={1} justifyContent="center" p={4} backgroundColor={'white'}>
            <VStack space={4}>
                <Button onPress={() => navigation.navigate('TutorProfileManagement')}>
                    Personal Profile
                </Button>
                <Button onPress={() => navigation.navigate('TutoredCoursesManagement')}>
                    Tutored Courses
                </Button>
                <Button onPress={() => navigation.navigate('TutorAvailabilityManagement')}>
                    Availability
                </Button>
                <Button onPress={() => console.log('Payment')}>
                    Payments
                </Button>
                <VStack mt={50} height={"40%"} space={4} justifyContent={'flex-end'}>
                    <Button onPress={handleLogout} variant="outline">
                        Logout
                    </Button>
                    <Button onPress={handleDeleteAccount} colorScheme="red">
                        Delete Account
                    </Button>
                </VStack>
            </VStack>
        </Box>
    );
};


export default TutorAccountSettings;
