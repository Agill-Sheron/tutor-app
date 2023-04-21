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
import {TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import TutorAccountSettings from "../components/settings/TutorAccountSettings";
import TutorProfileManagement from "../components/profile/TutorProfileManagement";
import TutoredCoursesManagement from "../components/profile/TutoredCoursesManagement";
import TutorAvailabilityManagement from "../components/profile/TutorAvailabilityManagement";
import TutorPaymentManagement from "../components/profile/TutorPaymentManagement";
import StudentAccountSettings from "../components/settings/StudentAccountSettings";
import StudentProfileManagement from "../components/profile/StudentProfileManagement";


const Stack = createStackNavigator();

const AppNavigator = () => {
    const { user, userType } = useContext(AuthContext);

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={({ navigation }) => ({
                    headerStyle: {
                        backgroundColor: 'transparent',
                        elevation: 0,
                        shadowOpacity: 0,
                        minHeight: 80,
                    },
                    headerRight: () => (
                        <TouchableOpacity
                            style={{ marginRight: 15 }}
                            onPress={() => userType === 'tutor' ? navigation.navigate('TutorAccountSettings', { user }) : navigation.navigate('StudentAccountSettings', { user })}
                        >
                            <Ionicons name="settings-outline" size={40} color="#611f2a" />
                        </TouchableOpacity>
                    ),
                })}>
                {user ?  (
                    <>
                        <Stack.Screen
                            name="TutorDashboard"
                            component={TutorDashboard}
                            options={{ headerShown: true, title: "" }}
                        />
                        <Stack.Screen
                            name="TutorAppointment"
                            component={TutorAppointment}
                            options={{ headerShown: true, title: "" }}
                        />
                        <Stack.Screen
                            name="TutorRequest"
                            component={TutorRequest}
                            options={{ headerShown: true, title: "" }}
                        />
                        <Stack.Screen
                            name="StudentDashboard"
                            component={StudentDashboard}
                            options={{ headerShown: true, title: "" }}
                        />
                        <Stack.Screen
                            name="TutorSearch"
                            component={TutorSearch}
                            options={{ headerShown: true , title: "" }}
                        />
                        <Stack.Screen
                            name="TutorSearchProfile"
                            component={TutorSearchProfile}
                            options={{ headerShown: false }}
                        />

                        <Stack.Screen
                            name="TutorAccountSettings"
                            component={TutorAccountSettings}
                            options={{ headerShown: true, title: "Account Settings" ,headerRight: null, headerLeft: null }}
                        />

                        <Stack.Screen
                            name="StudentAccountSettings"
                            component={StudentAccountSettings}
                            options={{ headerShown: true, title: "Account Settings" ,headerRight: null, headerLeft: null }}
                        />

                        <Stack.Screen
                            name="TutorProfileManagement"
                            component={TutorProfileManagement}
                            options={{ headerShown: true, title: "Profile Management" ,headerRight: null, headerLeft: null }}
                        />

                        <Stack.Screen
                            name="StudentProfileManagement"
                            component={StudentProfileManagement}
                            options={{ headerShown: true, title: "Profile Management" ,headerRight: null, headerLeft: null }}
                        />

                        <Stack.Screen
                            name="TutoredCoursesManagement"
                            component={TutoredCoursesManagement}
                            options={{ headerShown: true, title: "Tutored Courses Management" ,headerRight: null, headerLeft: null }}
                        />

                        <Stack.Screen
                            name="TutorAvailabilityManagement"
                            component={TutorAvailabilityManagement}
                            options={{ headerShown: true, title: "Availability Management" ,headerRight: null, headerLeft: null }}
                        />

                        <Stack.Screen
                            name="TutorPaymentManagement"
                            component={TutorPaymentManagement}
                            options={{ headerShown: true, title: "Payments Management" ,headerRight: null, headerLeft: null }}
                        />
                    </>
                ): (
                    <>
                        <Stack.Screen
                            name="Login"
                            component={LoginForm}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen name="StudentSignUp" component={StudentSignupForm} options={{title: "Student Sign Up", headerLeft:null, headerRight:null}}/>
                        <Stack.Screen name="TutorSignUp" component={TutorSignupForm}
                                      options={{
                                          title: "Tutor Sign Up",
                                          headerLeft:null,
                                          headerRight:null,
                                     }} />
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