import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import StudentSignupForm from '../components/auth/StudentSignupForm';
import TutorSignupForm from '../components/auth/TutorSignupForm';
import TutorDashboard from '../components/main/TutorDashboard';
import StudentDashboard from '../components/main/StudentDashboard';
import TutorAppointment from "../components/main/TutorAppointment";
import TutorRequest from "../components/main/TutorRequest";
import TutorSearch from "../components/main/TutorSearch";
import TutorSearchProfile from "../components/main/TutorSearchProfile";

import LoginForm from '../components/auth/LoginForm';

import { AuthProvider, AuthContext } from '../context/AuthContext';


const Stack = createStackNavigator();

const AppNavigator = () => {
    const { user } = useContext(AuthContext);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {user ?  (
                    <>
                        <Stack.Screen
                            name="TutorDashboard"
                            component={TutorDashboard}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="TutorAppointment"
                            component={TutorAppointment}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="TutorRequest"
                            component={TutorRequest}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="StudentDashboard"
                            component={StudentDashboard}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="TutorSearch"
                            component={TutorSearch}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="TutorSearchProfile"
                            component={TutorSearchProfile}
                            options={{ headerShown: false }}
                        />
                    </>
                ): (
                    <>
                        <Stack.Screen
                            name="Login"
                            component={LoginForm}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen name="StudentSignUp" component={StudentSignupForm} />
                        <Stack.Screen name="TutorSignUp" component={TutorSignupForm} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const AppNavigatorWithAuth = () => (
    <AuthProvider>
        <AppNavigator />
    </AuthProvider>
);

export default AppNavigatorWithAuth;