import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import home from "../screens/Main/Home";
import BottomTab from "./BottomTab";


const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='BottomTab' screenOptions={{
        headerShown: false,
      }}>
        {/* <Stack.Group>
          <Stack.Screen name={'home'} component={home} />
        </Stack.Group> */}
        <Stack.Group >
          <Stack.Screen name={'BottomTab'} component={BottomTab} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
