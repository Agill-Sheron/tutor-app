// components/AccountSettings.js
import React from 'react';
import { VStack, Box, Text, Button } from 'native-base';
import {useRoute} from "@react-navigation/native";

const TutorAccountSettings = () => {
    const route = useRoute();
    const tutor = route.params.tutor;

    return (
        <Box flex={1} justifyContent="center" p={4}>
            <VStack space={4}>
                <Button onPress={() => console.log('Personal Profile')}>
                    Personal Profile
                </Button>
                <Button onPress={() => console.log('Tutored Courses')}>
                    Tutored Courses
                </Button>
                <Button onPress={() => console.log('Availabilities')}>
                    Availabilities
                </Button>
                <Button onPress={() => console.log('PayPal Account')}>
                    PayPal Account
                </Button>
                <Button onPress={() => console.log('Logout')} variant="outline">
                    Logout
                </Button>
                <Button onPress={() => console.log('Delete')} colorScheme="red">
                    Delete Account
                </Button>
            </VStack>
        </Box>
    );
};

export default TutorAccountSettings;
