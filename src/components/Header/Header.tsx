import {
    SafeAreaView,
    StatusBar,
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from "react-native";
import React, { ReactNode, useCallback } from "react";
import { p } from "../../utils";
export default function Header({
    headerLeft,
    title,
    headerRight,
    containerStyle,
    centerStyle,
    leftStyle,
    rightStyle,
    barStyle = "dark-content",
}: {
    title?: string;
    HeaderColor?: string;
    headerLeft?: ReactNode;
    headerRight?: ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
    centerStyle?: StyleProp<ViewStyle>;
    leftStyle?: StyleProp<ViewStyle>;
    rightStyle?: StyleProp<ViewStyle>;
    barStyle?: "dark-content" | "default" | "light-content";
}) {


    const CustomStatusBar = ({
        barStyle,
        ...props
    }: {
        barStyle: "dark-content" | "default" | "light-content";
    }) => {
        return (
            <View style={{}}>
                <SafeAreaView style={{}}>
                    <StatusBar translucent {...props} barStyle={barStyle} />
                </SafeAreaView>
            </View>
        );
    };

    const renderLeftButton = useCallback(() => {
        if (headerLeft) {
            return (
                <View
                    style={[
                        {
                            display: 'flex',
                            flex: 1,
                            justifyContent: "center",
                            alignItems: 'center',
                        },
                        leftStyle,
                    ]}
                >
                    {headerLeft}
                </View>
            );
        }
        // Eğer headerLeft boşsa, sol boşluk bırak
        return <View style={[{ flex: 1, }, leftStyle]} />;
    }, []);
    const renderTitle = useCallback(() => {
        if (title) {
            return (
                <View
                    style={[
                        {
                            display: 'flex',
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        },
                        centerStyle,
                    ]}
                >
                    <Text
                        style={{
                            fontSize: 30,
                            fontWeight: "600",
                            letterSpacing: 2,
                        }}
                    >
                        {title}
                    </Text>
                </View>
            );
        }

        return <View style={[{ flex: 1, }, centerStyle]} />;

        // Eğer title boşsa, sol köşede boş bırak
        return <View style={{ flex: 1 }} />;
    }, []);

    const renderRightButton = useCallback(() => {
        if (headerRight) {
            return (
                <View
                    style={[
                        {
                            display: 'flex',
                            flex: 1,

                            justifyContent: "center",
                            alignItems: "center",
                        },
                        rightStyle,
                    ]}
                >
                    {headerRight}
                </View>
            );
        }
        return <View style={[{ flex: 1, }, rightStyle]} />;
    }, []);

    return (
        <View style={{
        }}>
            <CustomStatusBar barStyle={barStyle} />
            <View
                style={[
                    {
                        display: 'flex',
                        flexDirection: 'row',
                        paddingVertical: p(10),
                    },
                    containerStyle,
                ]}
            >
                {renderLeftButton()}
                {renderTitle()}
                {renderRightButton()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

});
