import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    View,
    Platform,
    Linking,
    ScrollView,
    StatusBar,
} from "react-native";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { ErrorMessage, Formik } from "formik";
import { IconButton, TextInput } from "../../../components";
import { h, m, p, w } from "../../../utils";
import Button from "../../../components/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetFlatList,
    BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import {
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";

import { Portal } from "@gorhom/portal";

import PhoneInput from "react-native-international-phone-number";

import * as Location from "expo-location";
import Header from "../../../components/Header";

const isIos = Platform.OS === "ios" && true;

export default function Profile({ navigation }) {
    const [userInfo, setUserInfo] = useState({
        fullname: "Can Salman",
        mail: "example@example.com",
        birthday: "01/01/1991",
        phone: "05559687812",
        location: "Edirne,Turkey",
    });

    const bottomSheetRef = useRef<BottomSheet>(null);
    const insets = useSafeAreaInsets();
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const snapPoints = useMemo(() => ["40%"], []);

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [inputValue, setInputValue] = useState("");

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [status, requestPermission] = Location.useForegroundPermissions();

    useEffect(() => {
        (async () => {
            requestPermission();

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = "Waiting..";
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    function handleInputValue(phoneNumber) {
        setInputValue(phoneNumber);
    }

    function handleSelectedCountry(country) {
        setSelectedCountry(country);
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
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const handleSheetChanges = useCallback((index?: number) => {
        isIos ? bottomSheetRef.current?.expand() : setShow(true);
    }, []);
    const handleSheetClose = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

    return (
        <View
            style={{
                flex: 1,
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}
        >
            <Header
                headerLeft={
                    <IconButton
                        icon="settings"
                        iconFamily="Feather"
                        onPress={() => navigation.navigate("Settings")}
                        size={20}
                        iconColor="#fff"
                        style={{}}
                    />
                }
                containerStyle={{
                    backgroundColor: "#5DB075",
                }}
            />
            <ScrollView>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <View
                        style={{
                            backgroundColor: "#5DB075",
                            flex: 1,
                            position: "relative",
                            height: h(120),
                        }}
                    ></View>
                    <View>
                        <View
                            style={{
                                position: "absolute",
                                top: m(-90),
                                height: h(130),
                                width: w(150),
                                borderRadius: 1000,
                                backgroundColor: "#B8B8B8",
                                alignSelf: "center",
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 6,
                                borderColor: "white",
                            }}
                        >
                            <Entypo
                                name="user"
                                size={h(90)}
                                color={"#D7D7D7"}
                                style={{ marginBottom: m(5) }}
                            />
                        </View>

                        <View style={{ marginTop: m(100) }}>
                            <Text
                                style={{
                                    color: "black",
                                    alignSelf: "center",
                                    minWidth: w(340),
                                    fontSize: 16,
                                    marginLeft: m(10),
                                }}
                            >
                                Full name
                            </Text>
                            <TextInput
                                autoCapitalize="none"
                                placeholder={"fullname"}
                                value={userInfo.fullname}
                                secureTextEntry={false}
                                onChangeText={(fullname) =>
                                    setUserInfo((prevState) => ({
                                        ...prevState,
                                        fullname: fullname,
                                    }))
                                }
                            />
                            <Text
                                style={{
                                    color: "red",
                                    alignSelf: "center",
                                    minWidth: w(340),
                                    fontSize: 16,
                                    marginLeft: m(10),
                                }}
                            ></Text>
                        </View>

                        <View>
                            <Text
                                style={{
                                    color: "black",
                                    alignSelf: "center",
                                    minWidth: w(340),
                                    fontSize: 16,
                                    marginLeft: m(10),
                                }}
                            >
                                Email address
                            </Text>
                            <TextInput
                                placeholder={"mail"}
                                value={userInfo.mail}
                                secureTextEntry={false}
                                onChangeText={(mail) =>
                                    setUserInfo((prevState) => ({
                                        ...prevState,
                                        fullname: mail,
                                    }))
                                }
                            />
                            <Text
                                style={{
                                    color: "red",
                                    alignSelf: "center",
                                    minWidth: w(340),
                                    fontSize: 16,
                                    marginLeft: m(10),
                                }}
                            ></Text>
                        </View>

                        <View>
                            <Text
                                style={{
                                    color: "black",
                                    alignSelf: "center",
                                    minWidth: w(340),
                                    fontSize: 16,
                                    marginLeft: m(10),
                                }}
                            >
                                Date of birth
                            </Text>
                            <Pressable onPress={() => handleSheetChanges()}>
                                <TextInput
                                    placeholder={"Date"}
                                    value={date.toLocaleString()}
                                    editable={false}
                                    onPressIn={() => handleSheetChanges()}
                                    secureTextEntry={false}
                                    onChangeText={(date) =>
                                        setUserInfo((prevState) => ({
                                            ...prevState,
                                            fullname: date,
                                        }))
                                    }
                                    rightIconName="calendar"
                                    onRightIconPressed={() => handleSheetChanges()}
                                />
                                <Text
                                    style={{
                                        color: "red",
                                        alignSelf: "center",
                                        minWidth: w(340),
                                        fontSize: 16,
                                        marginLeft: m(10),
                                    }}
                                ></Text>
                            </Pressable>
                        </View>

                        <View>
                            <Text
                                style={{
                                    color: "black",
                                    alignSelf: "center",
                                    minWidth: w(340),
                                    fontSize: 16,
                                    marginLeft: m(10),
                                }}
                            >
                                Phone number
                            </Text>

                            <PhoneInput
                                value={inputValue}
                                onChangePhoneNumber={handleInputValue}
                                selectedCountry={selectedCountry}
                                placeholder="Phone Number"
                                customCaret={
                                    <IconButton
                                        icon="chevron-down"
                                        IconStyle={{
                                            flex: 1,
                                            position: "absolute",
                                            right: 0,
                                            marginRight: m(10),
                                        }}
                                        iconColor="#150B3D"
                                    />
                                }
                                phoneInputStyles={{
                                    container: {
                                        borderWidth: 0,
                                        maxWidth: w(340),
                                        alignSelf: "center",
                                        backgroundColor: "#E8E8E8",
                                    },
                                    flagContainer: {
                                        position: "relative",
                                        marginLeft: 0,
                                        paddingLeft: p(10),
                                        backgroundColor: "#E8E8E8",
                                        flex: 1,
                                    },
                                    flag: {
                                        display: "none",
                                        backgroundColor: "yellow",
                                    },
                                    callingCode: {
                                        fontSize: 16,
                                        marginRight: m(5),
                                        color: "#524B6B",
                                    },
                                    divider: {
                                        flex: 1,
                                        position: "absolute",
                                        right: -10,
                                        backgroundColor: "#FFFFFF",
                                    },
                                    input: {
                                        flex: 4,
                                        color: "#524B6B",
                                    },
                                }}
                                defaultCountry="TR"
                                defaultValue="+905066479988"
                                onChangeSelectedCountry={handleSelectedCountry}
                            />
                            <Text
                                style={{
                                    color: "red",
                                    alignSelf: "center",
                                    minWidth: w(340),
                                    fontSize: 16,
                                    marginLeft: m(10),
                                }}
                            ></Text>
                        </View>
                        <Pressable onPress={() => { }}>
                            <Text
                                style={{
                                    color: "black",
                                    alignSelf: "center",
                                    minWidth: w(340),
                                    fontSize: 16,
                                    marginLeft: m(10),
                                }}
                            >
                                Location
                            </Text>
                            <TextInput
                                placeholder={"location"}
                                value={userInfo.location}
                                // onPressIn={()=>{console.log("adsfƒ")}}
                                secureTextEntry={false}
                                editable={false}
                                onChangeText={(location) =>
                                    setUserInfo((prevState) => ({
                                        ...prevState,
                                        location: location,
                                    }))
                                }
                            />
                            <Text
                                style={{
                                    color: "red",
                                    alignSelf: "center",
                                    minWidth: w(340),
                                    fontSize: 16,
                                    marginLeft: m(10),
                                }}
                            >
                                {/* <ErrorMessage name="location" /> */}
                            </Text>
                        </Pressable>

                        {/* <Pressable onPress={() => {
                                Linking.openSettings()
                            }}>
                                <Text >{text}</Text>
                            </Pressable> */}
                        <Button
                            title={"Save"}
                            // onPress={() => handleSubmit()}
                            containerStyle={{ marginTop: m(20),marginBottom:m(20) }}
                        />
                    </View>

                    {isIos ? (
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
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    display="spinner"
                                    onChange={onChange}
                                />
                                <Button title={"OK"} onPress={() => handleSheetClose()} />
                            </BottomSheet>
                        </Portal>
                    ) : (
                        show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                display="spinner"
                                onChange={onChange}
                            />
                        )
                    )}
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({});
