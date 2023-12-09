
import React from 'react';
import { useColorScheme } from 'react-native';
import RootNavigator from './src/routes'
import {
    MD3LightTheme as DefaultTheme,
    PaperProvider,
} from 'react-native-paper';
import { LightTheme, DarkTheme } from './src/theme/Colors'
export default function App() {
    const colorScheme = useColorScheme();

    console.log("colorScheme", colorScheme)
    const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;

    return (
        <PaperProvider theme={theme}>
            <RootNavigator />
        </PaperProvider>
    );
}



