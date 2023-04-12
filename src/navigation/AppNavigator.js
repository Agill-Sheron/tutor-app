import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignupForm from '../components/auth/SignupForm';
import LoginForm from '../components/auth/LoginForm';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={LoginForm}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignupForm}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;