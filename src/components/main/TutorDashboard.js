import React, { useContext } from 'react';
import { Alert } from 'react-native';
import { Button, Text, Box } from 'native-base';

import { AuthContext } from '../../context/AuthContext';

const TutorDashboard = () => {
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                },
                { text: 'Yes', onPress: () => logout() },
            ],
            { cancelable: true },
        );
    };

    return (
        <Box flex={1} justifyContent="center" alignItems="center">
            <Text fontSize="xl">Tutor Dashboard 🚧</Text>
            <Button onPress={handleLogout} mt={4}>
                <Text color={'white'}>Logout</Text>
            </Button>
        </Box>
    );
};

export default TutorDashboard;