import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../../constants/Colors';


export default function Home() {
    const navigation = useNavigation()



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

        <View style={{ flex: 1, backgroundColor: Colors.primaryBrandColor }}>
            <Text> home</Text>
        </View>

    );
}

