import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import home from "../screens/Main/Home";
import BottomTab from "./BottomTab";
import Splash from "../screens/Splash";
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";
import OnBoarding from "../screens/OnBoarding";
import ForgotPassword from "../screens/Auth/ForgotPassword";
import Profile from "../screens/Menu/Profile";
import Settings from "../screens/Menu/Settings";
import EditPassword from "../screens/Menu/EditPassword";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Transaction from "../screens/Main/Transaction";



const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <SafeAreaProvider>

    <NavigationContainer >
      <Stack.Navigator initialRouteName='Transaction' screenOptions={{
        headerShown: false,
      }}>
        <Stack.Group navigationKey="SPLASH">
          <Stack.Screen name={'OnBoarding'} component={OnBoarding} />
          <Stack.Screen name={'Splash'} component={Splash} />
        </Stack.Group>

        <Stack.Group navigationKey="AUTH">
          <Stack.Screen name={'Login'} component={Login} />
          <Stack.Screen name={'Register'} component={Register} />
          {/* <Stack.Screen name={'Verification'} component={Verification} /> */}
          <Stack.Screen name={'ForgotPassword'} component={ForgotPassword} />
        </Stack.Group>

        <Stack.Group navigationKey="MAIN">
          <Stack.Screen name={'DashBoard'} component={BottomTab} />
          <Stack.Screen name={'Transaction'} component={Transaction} />
        </Stack.Group>

        <Stack.Group navigationKey="Profile">
          <Stack.Screen name={'Profile'} component={Profile} />
          <Stack.Screen name={'Settings'} component={Settings} />
          <Stack.Screen name={'EditPassword'} component={EditPassword} />
        </Stack.Group>

      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>

  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
