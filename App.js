import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider} from "native-base";
import customTheme from "./src/customTheme";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
        <NativeBaseProvider theme={customTheme}>
            <NavigationContainer>
                <AppNavigator />
                <StatusBar style="auto" />
            </NavigationContainer>
        </NativeBaseProvider>
    </SafeAreaProvider>
  );
}