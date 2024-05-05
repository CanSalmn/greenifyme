import { Platform, Pressable, StyleSheet, View, Text } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import { IconButton } from "../../../components";
import { h, m, p, w } from "../../../utils";
import { Switch } from "react-native-paper";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import Button from "../../../components/Button";

const isIos = Platform.OS === "ios" && true;

export default function Settings({ navigation }) {
    const insets = useSafeAreaInsets();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [isNotificationChecked, setIsNotificationChecked] =
        useState<boolean>(false);
    const [isDarkModeChecked, setIsDarkModeChecked] = useState<boolean>(false);
    const snapPoints = useMemo(() => ["40%"], []);

    const handleSheetChanges = useCallback((index?: number) => {
        bottomSheetRef.current?.expand();
    }, []);
    const handleSheetClose = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);
    const handleLogOut = () => {
        handleSheetClose();
        navigation.navigate("Login");
    }
    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={1}
            />
        ),
        []
    );

    return (
        <View
            style={{
                flex: 1,
                paddingTop: insets.top,
                paddingBottom: insets.bottom + 65,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}
        >
            <Header
                title="Settings"
                // headerLeft={
                //     <IconButton
                //         icon="keyboard-backspace"
                //         iconFamily="MaterialIcons"
                //         onPress={() => navigation.goBack()}
                //         size={30}
                //         iconColor="#524B6B"
                //         style={{}}
                //     />
                // }

                headerLeft={
                    <IconButton
                        icon="keyboard-backspace"
                        iconFamily="MaterialIcons"
                        onPress={() => navigation.goBack()}
                        size={30}
                        iconColor="#524B6B"
                        style={{}}
                    />
                }
            />
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View
                    style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#F6F6F6",
                        minHeight: h(40),
                        width: w(340),
                        borderRadius: 10,
                        paddingHorizontal: p(20),
                        flexDirection: "row",
                    }}
                >
                    <IconButton
                        icon="bell"
                        iconFamily="EvilIcons"
                        size={30}
                        iconColor="#524B6B"
                        text="Notifications"
                    />
                    <Switch
                        value={isNotificationChecked}
                        onValueChange={setIsNotificationChecked}
                    />
                </View>
                <View
                    style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#F6F6F6",
                        minHeight: h(40),
                        width: w(340),
                        borderRadius: 10,
                        paddingHorizontal: p(20),
                        flexDirection: "row",
                        marginTop: m(10),
                    }}
                >
                    <IconButton
                        icon="moon-outline"
                        iconFamily="Ionicons"
                        size={25}
                        iconColor="#524B6B"
                        text="Dark mode"
                    />
                    <Switch
                        value={isDarkModeChecked}
                        onValueChange={setIsDarkModeChecked}
                    />
                </View>
                <Pressable
                    onPress={() => navigation.navigate("EditPassword")}
                    style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#F6F6F6",
                        minHeight: h(40),
                        width: w(340),
                        borderRadius: 10,
                        paddingHorizontal: p(20),
                        flexDirection: "row",
                        marginTop: m(10),
                    }}
                >
                    <IconButton
                        icon="lock"
                        iconFamily="Feather"
                        size={25}
                        iconColor="#524B6B"
                        text="Password"
                    />
                    <IconButton
                        icon="right"
                        iconFamily="AntDesign"
                        size={20}
                        iconColor="#524B6B"
                    />
                </Pressable>
                <Pressable
                    onPress={() => handleSheetChanges()}
                    style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#F6F6F6",
                        minHeight: h(40),
                        width: w(340),
                        borderRadius: 10,
                        paddingHorizontal: p(20),
                        flexDirection: "row",
                        marginTop: m(10),
                    }}
                >
                    <IconButton
                        icon="logout"
                        iconFamily="MaterialIcons"
                        size={25}
                        iconColor="#524B6B"
                        text="Logout"
                    />
                    <IconButton
                        icon="right"
                        iconFamily="AntDesign"
                        size={20}
                        iconColor="#524B6B"
                    />
                </Pressable>

                <Portal>
                    <BottomSheet
                        ref={bottomSheetRef}
                        index={-1}
                        style={{ padding: p(20) }}
                        backgroundStyle={{ padding: p(10) }}
                        handleStyle={{}}
                        enablePanDownToClose={true}
                        snapPoints={snapPoints}
                        backdropComponent={renderBackdrop}
                    >
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <Text
                                style={{
                                    paddingVertical: p(5),
                                    marginTop: m(30),
                                    fontSize: 16,
                                    fontWeight: "bold",
                                }}
                            >
                                Log Out
                            </Text>
                            <Text
                                style={{
                                    paddingVertical: p(20),
                                    fontSize: 12,
                                    fontWeight: "300",
                                }}
                            >
                                Are you sure you want to leave?
                            </Text>

                            <Button
                                title={"YES"}
                                containerStyle={{ paddingHorizontal: p(10), height: h(35) }}
                                onPress={() => handleLogOut()}
                            />
                            <Button
                                title={"CANCEL"}
                                containerStyle={{
                                    paddingHorizontal: p(10),
                                    height: h(35),
                                    marginTop: m(10),
                                    opacity: 0.5,
                                }}
                                onPress={handleSheetClose}
                            />
                        </View>
                    </BottomSheet>
                </Portal>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
