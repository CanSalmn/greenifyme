import { View, Text } from 'react-native'
import React from 'react'
import {
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Header, IconButton } from '../../../components';
export default function Report() {
    const insets = useSafeAreaInsets();

    return (
        <View style={{
            flex: 1,
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




        </View>
    )
}