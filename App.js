import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider} from "native-base";
import customTheme from "./src/customTheme";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
        <NativeBaseProvider theme={customTheme}>
            <AppNavigator />
            <StatusBar style="auto" />
        </NativeBaseProvider>
    </SafeAreaProvider>
  );
}