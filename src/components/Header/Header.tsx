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
import React, { useCallback } from "react";
import {
    useSafeAreaFrame,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function Header({ headerLeft, HeaderColor, title }) {
    const insets = useSafeAreaInsets();
    const frame = useSafeAreaFrame();




    const CustomStatusBar = ({
        backgroundColor,
        barStyle,
        ...props
    }: {
        backgroundColor: string;
        barStyle: string;
    }) => {
        const { top } = useSafeAreaInsets();
        return (
            <View
                style={{ height: StatusBar.currentHeight || top / 3, backgroundColor }}
            >
                <SafeAreaView style={{ backgroundColor }}>
                    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
                </SafeAreaView>
            </View>
        );
    };
    const renderLeftButton = useCallback(() => {
        if (headerLeft) {
            return (
                <View style={{ backgroundColor: 'yellow', flex: 1 }}>
                    {headerLeft}
                </View>

                // <PlatformPressable
                //     accessible
                //     accessibilityRole="button"
                //     onPress={headerLeft?.disabled ? undefined : handleLeftButtonPress}
                //     pressColor={headerLeft?.pressColor}
                //     pressOpacity={headerLeft?.pressOpacity}
                //     android_ripple={{ borderless: true }}
                //     style={[
                //         styles.container,
                //         headerLeft?.disabled && styles.disabled,
                //         headerLeft?.style,
                //     ]}
                //     hitSlop={Platform.select({
                //         ios: undefined,
                //         default: { top: 16, right: 16, bottom: 16, left: 16 },
                //     })}>
                //     <React.Fragment>
                //         {headerLeft?.iconName && (
                //             <Icon name={headerLeft?.iconName} size={30} style={styles.icon} />
                //         )}
                //     </React.Fragment>
                // </PlatformPressable>
            );
        }
    }, []);

    return (
        <>
            {/* <CustomStatusBar barStyle={"dark-content"} backgroundColor={"red"} /> */}
            <Animated.View pointerEvents="box-none" style={{ backgroundColor: 'blue' }}>
                {/* style={[{ minHeight, maxHeight, opacity, transform }]} */}
                <View pointerEvents="box-none" >
                    <Animated.View
                        pointerEvents="box-none"

                    >
                        {renderLeftButton()}
                        {/* {renderBackButton()}  */}
                    </Animated.View>
                    {/* <Animated.View
                        pointerEvents="box-none"
                        style={[
                            styles.title,
                            {
                                maxWidth:
                                    headerTitleAlign === 'center'
                                        ? layout.width -
                                        ((headerLeft
                                            ? headerLeftLabelVisible !== false
                                                ? 80
                                                : 32
                                            : 16) +
                                            Math.max(insets.left, insets.right)) *
                                        2
                                        : layout.width -
                                        ((headerLeft ? 72 : 16) +
                                            (headerRight ? 72 : 16) +
                                            insets.left -
                                            insets.right),
                            },
                            titleContainerStyle,
                        ]}>
                        {headerTitle({
                            children: title,
                            allowFontScaling: titleAllowFontScaling,
                            tintColor: headerTintColor,
                            style: titleStyle,
                        })}
                    </Animated.View> */}
                    {/* <Animated.View
                        pointerEvents="box-none"
                        style={[
                            styles.right,
                            styles.expand,
                            { marginEnd: insets.right },
                            rightContainerStyle,
                        ]}>
                        {renderRightButton()}
                    </Animated.View> */}
                </View>
            </Animated.View>
        </>
    );
}

const styles = StyleSheet.create({
    content: {
        flexDirection: "row",

        height: 50,
    },
    // title: {
    //     marginHorizontal: 16,
    //     justifyContent: "center",
    // },
    // left: {
    //     justifyContent: "center",
    //     alignItems: "flex-start",
    // },
    // right: {
    //     justifyContent: "center",
    //     alignItems: "flex-end",
    // },
    // expand: {
    //     flexGrow: 1,
    //     flexBasis: 0,
    // },
    // disabled: {
    //     opacity: 0.5,
    // },
    // container: {
    //     alignItems: "center",
    //     flexDirection: "row",
    //     minWidth: StyleSheet.hairlineWidth,
    //     ...Platform.select({
    //         ios: null,
    //         default: {
    //             marginVertical: 3,
    //             marginHorizontal: 11,
    //         },
    //     }),
    // },

    // label: {
    //     fontSize: 17,
    //     letterSpacing: 0.35,
    // },
    // labelWrapper: {
    //     flexDirection: "row",
    //     alignItems: "flex-start",
    // },
    // icon: Platform.select({
    //     ios: {
    //         height: 30,
    //         width: 30,
    //         marginLeft: 10,
    //         marginRight: 22,
    //         marginVertical: 12,
    //         resizeMode: "contain",
    //         transform: [{ scaleX: I18nManager.getConstants().isRTL ? -1 : 1 }],
    //     },
    //     default: {
    //         height: 30,
    //         width: 30,
    //         margin: 3,
    //         resizeMode: "contain",
    //         transform: [{ scaleX: I18nManager.getConstants().isRTL ? -1 : 1 }],
    //     },
    // }),
    // iconWithLabel:
    //     Platform.OS === "ios"
    //         ? {
    //             marginRight: 6,
    //         }
    //         : {},
    // iconMaskContainer: {
    //     flex: 1,
    //     flexDirection: "row",
    //     justifyContent: "center",
    // },
    // iconMaskFillerRect: {
    //     flex: 1,
    //     backgroundColor: "#000",
    // },
    // iconMask: {
    //     height: 21,
    //     width: 13,
    //     marginLeft: -14.5,
    //     marginVertical: 12,
    //     alignSelf: "center",
    //     resizeMode: "contain",
    //     transform: [{ scaleX: I18nManager.getConstants().isRTL ? -1 : 1 }],
    // },
});
