import * as React from 'react';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Home from '../screens/Main/Home';
import Profile from '../screens/Profile/Profile';
import CustomBottomTab from '../components/BottomTab/CustomBottomTab';
const Tab = createBottomTabNavigator();




export default function BottomTab() {
    const navigation = useNavigation()



    return (
        <Tab.Navigator tabBar={props => <CustomBottomTab {...props} />}>



            <Tab.Group
                screenOptions={{
                    headerShown: false,
                }}>
                <Tab.Screen
                    options={{ tabBarLabel: 'Home' }}
                    name="Products"
                    component={Home}
                />
                <Tab.Screen
                    options={{ tabBarLabel: 'Cart' }}
                    name="Cart"
                    component={Home}
                />

                <Tab.Screen
                    options={{ tabBarLabel: 'Favourites' }}
                    name="Favourites"
                    component={Home}
                />
                <Tab.Screen
                    options={{ tabBarLabel: 'Profile' }}
                    name="Profile"
                    component={Profile}
                />
            </Tab.Group>

        </Tab.Navigator >



    );
}

