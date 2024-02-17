import * as React from 'react';
import { Button, Pressable, Text, TouchableHighlight, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
// import { Add, Home, Report, Transaction, Wallet } from '../Screens/Main'
import Home from '../screens/Main/Home';

import { useTheme } from '@react-navigation/native'
// import { Theme } from '../Theme/Themes'
import { HomeTabIcon, MapTabIcon, EnvironmentTabIcon, ProfileTabIcon, ScanTabIcon } from '../assets/svg';
// import AddButton from './AddButton';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from '../components';
import { h, w } from '../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Profile from '../screens/Menu/Profile';
import Map from "../screens/Main/Map";
import Community from "../screens/Main/Community";
import Scanner from "../screens/Main/Scanner";





const Tab = createBottomTabNavigator();


const AddScreen = () => {
    return null
}

export default function BottomTab() {
    // const theme = useTheme() as unknown as Theme
    const navigation = useNavigation()
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator initialRouteName='Home'
            screenOptions={{
                lazy: true,
                headerShown: false,
                tabBarActiveTintColor: '#5DB075', // active icon color: ;
                tabBarInactiveTintColor: "#B4B1B1", // inactive icon color: ;
                tabBarShowLabel: true,
                // tabBarIconStyle: { paddingTop: 20 },
                tabBarStyle: {
                    backgroundColor: "white", // TabBar background
                    zIndex: 2,
                    height: 60 + insets.bottom,
                },
                tabBarLabelStyle: {},



            }}
        >
            <Tab.Screen name="Home" component={Home} options={{
                tabBarLabel: "Home",

                tabBarIcon: ({ color, size }) => (
                    <HomeTabIcon color={color} />
                ),
            }} />
            <Tab.Screen name="Map" component={Map} options={{
                tabBarLabel: "Map",
                tabBarIcon: ({ color, size }) => (
                    <MapTabIcon color={color} />
                ),
            }}
            />
            <Tab.Screen name="Scanner" component={Scanner} options={{
                tabBarLabel: " ",
                tabBarIcon: ({ color, size }) => (
                    <Pressable
                        onPress={() => navigation.navigate('Scanner'as never)}
                        style={{
                            top: -22.5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: w(90),
                            height: h(70),
                            borderRadius: 9999,
                            backgroundColor: "#5DB075",
                            zIndex: 50,
                            borderWidth: 10,
                            borderColor: '#8FC5A5',

                        }}
                    >
                        <ScanTabIcon color={'white'} fill={color} />
                    </Pressable>

                )
            }}
            />


            <Tab.Screen name="cummunity" component={Community} options={{
                tabBarLabel: "cummunity",
                tabBarIcon: ({ color, size }) => (
                    <EnvironmentTabIcon color={color} fill={color} />
                ),
            }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarLabel: "Profile",
                tabBarIcon: ({ color, size }) => (
                    <ProfileTabIcon color={color} fill={color} />
                ),
            }} />

        </Tab.Navigator >
    );
}

