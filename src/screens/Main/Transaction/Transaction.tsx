import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header, IconButton } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { BalanceCard } from '../../../components/Cards';

export default function Transaction() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    return (
        <View style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}>
            <Header
                title="History"
                headerLeft={
                    <IconButton
                        icon="keyboard-backspace"
                        iconFamily="MaterialIcons"
                        // onPress={() => navigation.goBack()}
                        size={30}
                        iconColor="#524B6B"
                        style={{}}
                    />
                }
            />
            <BalanceCard
            isTransaction={true}
            />
        </View>
    )
}