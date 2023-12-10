
import React from 'react';
import { useColorScheme } from 'react-native';
import RootNavigator from './src/routes'
import {
    PaperProvider,
} from 'react-native-paper';
import { LightTheme, DarkTheme } from './src/theme/Colors'
export default function App() {
    const colorScheme = useColorScheme();

    const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;

    return (
        <PaperProvider theme={theme}>
            <RootNavigator />
        </PaperProvider>
    );
}



