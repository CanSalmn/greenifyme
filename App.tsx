import React, { useEffect } from "react";
import {
    AppState,
    AppStateStatus,
    Platform,
    useColorScheme,
} from "react-native";
import RootNavigator from "./src/routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PaperProvider } from "react-native-paper";
import { LightTheme, DarkTheme } from "./src/theme/Colors";
import { PortalProvider } from "@gorhom/portal";
import { Provider } from "react-redux";
import { store } from "./src/redux/Task/store";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";
import { focusManager } from "@tanstack/react-query";
import { ToastProvider } from 'react-native-toast-notifications'
export default function App() {
    const colorScheme = useColorScheme();
    const theme = colorScheme === "dark" ? DarkTheme : LightTheme;
    const queryClient = new QueryClient();

    const { type, isConnected } = useNetInfo();
    console.log("isConnected", isConnected);
    console.log("type", type);
    onlineManager.setEventListener((setOnline) => {
        return NetInfo.addEventListener((state) => {
            setOnline(!!state.isConnected);
        });
    });
    function onAppStateChange(status: AppStateStatus) {
        if (Platform.OS !== "web") {
            focusManager.setFocused(status === "active");
        }
    }
    useEffect(() => {
        const subscription = AppState.addEventListener("change", onAppStateChange);
        return () => subscription.remove();
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ToastProvider
                textStyle={{ fontSize: 16 }}
            >
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        <PortalProvider>
                            <PaperProvider theme={theme}>
                                <RootNavigator />
                            </PaperProvider>
                        </PortalProvider>
                    </Provider>
                </QueryClientProvider>
            </ToastProvider>
        </GestureHandlerRootView >
    );
}
