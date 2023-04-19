import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import StudentSignupForm from '../components/auth/StudentSignupForm';
import TutorSignupForm from "../components/auth/TutorSignupForm";

import TutorDashboard from "../components/main/TutorDashboard"

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
            <Stack.Screen name="StudentSignUp" component={StudentSignupForm} />
            <Stack.Screen name="TutorSignUp" component={TutorSignupForm} />
            <Stack.Screen name="TutorDashboard" component={TutorDashboard} />
        </Stack.Navigator>
    );
};

export default AppNavigator;