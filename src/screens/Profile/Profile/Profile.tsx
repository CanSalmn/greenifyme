import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Platform,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ErrorMessage, Formik } from "formik";
import { IconButton, TextInput } from "../../../components";
import { m, p, w } from "../../../utils";
import Button from "../../../components/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetFlatList,
    BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";

import PhoneInput from "react-native-international-phone-number";

import * as Location from 'expo-location';


const isIos = Platform.OS === "ios" && true;

export default function Profile() {
    const bottomSheetRef = useRef<BottomSheet>(null);

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const snapPoints = useMemo(() => ["40%"], []);

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [inputValue, setInputValue] = useState("");


    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [status, requestPermission] = Location.useForegroundPermissions();

    console.log("status", status)

    useEffect(() => {
        (async () => {
            requestPermission()

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
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
        <SafeAreaView>
            <View>
                <Formik
                    initialValues={{ mail: "", password: "" }}
                    // validationSchema={validationSchema}
                    onSubmit={(val: any) => { }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
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
                                Full name
                            </Text>
                            <TextInput
                                autoCapitalize="none"
                                placeholder={"Email"}
                                value={values.mail}
                                secureTextEntry={false}
                                onBlur={handleBlur("mail")}
                                onChangeText={handleChange("mail")}
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
                                <ErrorMessage name="mail" />
                            </Text>

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
                                placeholder={"Password"}
                                value={values.password}
                                secureTextEntry={true}
                                onBlur={handleBlur("password")}
                                onChangeText={handleChange("password")}
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
                                <ErrorMessage name="password" />
                            </Text>

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
                            <TextInput
                                placeholder={"Password"}
                                value={values.password}
                                secureTextEntry={false}
                                onBlur={handleBlur("password")}
                                onChangeText={handleChange("password")}
                                rightIconName="calendar"
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
                                <ErrorMessage name="password" />
                            </Text>

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
                            >
                                <ErrorMessage name="password" />
                            </Text>
                            <View style={{ marginTop: 10 }}>
                                <Text>
                                    Country:{" "}
                                    {`${selectedCountry?.name?.en} (${selectedCountry?.cca2})`}
                                </Text>
                                <Text>
                                    Phone Number:{" "}
                                    {`${selectedCountry?.callingCode} ${inputValue}`}
                                </Text>
                            </View>

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
                                placeholder={"Password"}
                                value={values.password}
                                secureTextEntry={false}
                                onBlur={handleBlur("password")}
                                onChangeText={handleChange("password")}
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
                                <ErrorMessage name="password" />
                            </Text>




                            <Pressable onPress={() => { }}>

                                <Text >{text}</Text>

                            </Pressable>




                            <Button
                                title={"Save"}
                                onPress={() => handleSubmit()}
                                containerStyle={{ marginTop: m(20) }}
                            />
                        </View>
                    )}
                </Formik>
            </View>

            <View style={{ marginTop: 50 }}>
                <Button
                    onPress={() => handleSheetChanges()}
                    title="Show date picker!"
                />
                <Text>selected: {date.toLocaleString()}</Text>
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
