import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import SignupForm from '../components/auth/SignupForm';
import LoginForm from '../components/auth/LoginForm';
import StudentDashboard from '../components/StudentDashboard/StudentDashboard'
import TutorDashboard from '../components/TutorDashboard/TutorDashboard';
import RoleSelectionScreen from '../components/auth/RoleSelection';
import UserDetailsScreen from '../components/auth/UserDetails';

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
        <Stack.Screen
        name="RoleSelection"
        component={RoleSelectionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserDetails"
        component={UserDetailsScreen}
        options={{ headerShown: false }}
      />
            <Stack.Screen
                name="Student Dashboard"
                component={StudentDashboard}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="Tutor Dashboard"
                component={TutorDashboard}
                options={{ headerShown: true }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;