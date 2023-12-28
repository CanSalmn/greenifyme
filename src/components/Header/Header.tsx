import {
    Animated,
    I18nManager,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { ReactNode, useCallback } from "react";
import {
    useSafeAreaFrame,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { m } from "../../utils";

export default function Header({
    headerLeft,
    title,
    headerRight,
    containerStyle,
    centerStyle,
    leftStlye,
    rightStyle,
    barStyle = "dark-content",
}: {
    title?: string;
    HeaderColor?: string;
    headerLeft?: ReactNode;
    headerRight?: ReactNode;
    containerStyle?: any;
    centerStyle?: any;
    leftStlye?: any;
    rightStyle?: any;
    barStyle?: any;
}) {
    const insets = useSafeAreaInsets();
    const frame = useSafeAreaFrame();

    const CustomStatusBar = ({
        barStyle,
        ...props
    }: {
        barStyle: "dark-content" | "default" | "light-content";
    }) => {
        const { top } = useSafeAreaInsets();
        return (
            <View style={{ height: StatusBar.currentHeight || top / 5 }}>
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
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            alignSelf: "center",

                        },
                        leftStlye,
                    ]}
                >
                    {headerLeft}
                </View>
            );
        }
    }, []);

    const renderRightButton = useCallback(() => {
        if (headerRight) {
            return (
                <View
                    style={[
                        {
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            alignSelf: "center",
                        },
                        rightStyle,
                    ]}
                >
                    {headerRight}
                </View>
            );
        }
    }, []);

    return (
        <>
            <CustomStatusBar barStyle={barStyle} />
            <SafeAreaView
                style={[
                    {
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: m(5),
                        marginBottom: m(15),
                    },
                    containerStyle,
                ]}
            >
                {renderLeftButton()}
                <View
                    style={[
                        { flex: 1, justifyContent: "center", alignItems: "center" },
                        centerStyle,
                    ]}
                >
                    <Text
                        style={{
                            fontSize: 30,
                            fontWeight: "600",
                            textAlign: "center",
                            letterSpacing: 2,
                        }}
                    >
                        {title}
                    </Text>
                </View>
                {renderRightButton()}
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    content: {
        flexDirection: "row",

        height: 50,
    },
});
