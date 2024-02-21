
import React from 'react';
import { useColorScheme } from 'react-native';
import RootNavigator from './src/routes'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
    PaperProvider,
} from 'react-native-paper';
import { LightTheme, DarkTheme } from './src/theme/Colors'
import { PortalProvider } from '@gorhom/portal';
import { Provider } from 'react-redux';
import { store } from './src/redux/Task/store';
export default function App() {
    const colorScheme = useColorScheme();

    const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;

    return (
        <GestureHandlerRootView style={{ flex: 1 }} >
            <Provider store={store}>
                <PortalProvider>
                    <PaperProvider theme={theme}>
                        <RootNavigator />
                    </PaperProvider>
                </PortalProvider>
            </Provider>
        </GestureHandlerRootView >
    );
}



