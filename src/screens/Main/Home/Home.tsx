import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { useColorScheme,Appearance } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../../constants/Colors';

import { useTheme } from 'react-native-paper';
export default function Home() {
    const navigation = useNavigation()

    const theme = useTheme()

    const BottomTabsData = [
        {
            id: 'currency-tab',
            title: 'Currency',
            icon: <Ionicons name="create" color="#fff" size={25} />,
            activeIcon: <Ionicons name="create" color="#4d4d4d" size={25} />
        },
        {
            id: 'converter-tab',
            title: 'Converter',
            icon: <Ionicons name="create" color="#fff" size={25} />,
            activeIcon: <Ionicons name="create" color="#4d4d4d" size={25} />
        },
        {
            id: 'gold-tab',
            title: 'Gold',
            icon: <Ionicons name="create" color="#fff" size={25} />,
            activeIcon: <Ionicons name="create" color="#4d4d4d" size={25} />
        },
        {
            id: 'settings-tab',
            title: 'Settings',
            icon: <Ionicons name="create" color="#fff" size={25} />,
            activeIcon: <Ionicons name="create" color="#4d4d4d" size={25} />
        },
    ];




    
    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: theme.colors.primary }}> home</Text>

        
        </View>

    );
}

