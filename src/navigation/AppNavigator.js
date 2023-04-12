import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignupForm from '../components/auth/SignupForm';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignUp" component={SignupForm} />
    </Stack.Navigator>
  );
};

export default AppNavigator;