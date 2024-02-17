import React, { useRef, useCallback, useState, useMemo } from "react";
import { View, Text, Pressable, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header, IconButton, TextInput } from "../../../components";
import { useNavigation } from "@react-navigation/native";
import { h, m, p, w } from "../../../utils";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import Button from "../../../components/Button";
import DateTimePicker from "@react-native-community/datetimepicker";

const isIos = Platform.OS === "ios" && true;

type DataType = {
    category: number;
    startDate: Date;
    endDate: Date;
    taskDescripton: string;
};

export default function DailyTask() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [show, setShow] = useState(false);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [isSelectEndDate, setIsSelectEndDate] = useState<boolean>(false);
    const [categorySelect, setCategorySelect] = useState<boolean>(false);
    const [task, setTask] = useState<DataType>({
        category: 0,
        startDate: new Date(),
        endDate: new Date(),
        taskDescripton: "",
    });

    const snapPoints = useMemo(() => ["40%"], []);
    const renderBackdrop = (props: any) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={1}
            onPress={() => (categorySelect ? setCategorySelect(false) : null)}
        />
    );

    const handleSheetChanges = useCallback((index?: number) => {
        isIos ? bottomSheetRef.current?.expand() : setShow(true);
    }, []);
    const handleSheetClose = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

    const onChange = (event, selectedDate) => {
        setShow(false);
        isSelectEndDate
            ? (setTask((prev) => ({
                ...prev,
                endDate: selectedDate,
            })),
                setIsSelectEndDate(false))
            : setTask((prev) => ({
                ...prev,
                startDate: selectedDate,
            }));
    };

    console.log("tast", task);
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
                title="Daily Task"
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
                leftStyle={{ flex: 1 }}
                rightStyle={{ flex: 1 }}
                centerStyle={{ flex: 2 }}
            />

            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <TextInput
                    editable={false}
                    placeholder="Task Category"
                    rightIconName="arrow-down-drop-circle-outline"
                    onRightIconPressed={() => {
                        console.log("first");
                    }}
                    onPressIn={() => {
                        setCategorySelect(true);
                        handleSheetChanges();
                    }}
                />
                <View>
                    <Text
                        style={{
                            padding: p(15),
                            paddingLeft: p(22),
                            fontSize: 20,
                            fontWeight: "600",
                        }}
                    >
                        Schedule
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                        <Pressable
                            onPress={() => handleSheetChanges()}
                            style={{ width: "50%" }}
                        >
                            <TextInput
                                placeholder={"Start Date"}
                                value={
                                    task.startDate ? task.startDate.toLocaleDateString() : ""
                                }
                                editable={false}
                                onPressIn={() => handleSheetChanges()}
                                rightIconName="arrow-down-drop-circle-outline"
                                onRightIconPressed={() => handleSheetChanges()}
                                containerStyle={{ minWidth: 180, marginVertical: 0 }}
                            />
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                handleSheetChanges();
                                setIsSelectEndDate(true);
                            }}
                            style={{ width: "50%" }}
                        >
                            <TextInput
                                placeholder={"End Date"}
                                value={task.endDate ? task.endDate.toLocaleDateString() : ""}
                                editable={false}
                                onPressIn={() => {
                                    handleSheetChanges();
                                    setIsSelectEndDate(true);
                                }}
                                rightIconName="arrow-down-drop-circle-outline"
                                onRightIconPressed={() => handleSheetChanges()}
                                containerStyle={{ minWidth: 180, marginVertical: 0 }}
                            />
                        </Pressable>
                    </View>

                    <Text
                        style={{
                            padding: p(15),
                            paddingLeft: p(22),
                            fontSize: 20,
                            fontWeight: "600",
                        }}
                    >
                        Your Task
                    </Text>
                    <TextInput
                        multiline
                        placeholder="Type your task here..."
                        contentStyle={{ height: h(90) }}
                        onChangeText={(item) =>
                            setTask((prev) => ({
                                ...prev,
                                taskDescripton: item,
                            }))
                        }
                    />
                    <Button title={"CREATE"} containerStyle={{ marginTop: m(15) }} onPress={() => navigation.navigate('DashBoard' as never)} />
                </View>
            </View>
            {isIos || categorySelect ? (
                <Portal>
                    <BottomSheet
                        ref={bottomSheetRef}
                        index={-1}
                        style={{ padding: p(20) }}
                        backgroundStyle={{
                            padding: p(10),
                            backgroundColor: categorySelect && "#F6F6F6",
                        }}
                        handleStyle={{}}
                        enablePanDownToClose={true}
                        snapPoints={snapPoints}
                        backdropComponent={renderBackdrop}
                    >
                        {categorySelect ? (
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                }}
                            >
                                <Pressable
                                    style={{
                                        flexDirection: "row",
                                        height: h(40),
                                        width: w(340),
                                        alignItems: "center",
                                        backgroundColor: "white",
                                        borderRadius: 15,
                                        padding: p(10),
                                        margin: m(20),
                                    }}
                                    onPress={() => {
                                        setTask((prev) => ({
                                            ...prev,
                                            category: 0,
                                        }));
                                        handleSheetClose();
                                    }}
                                >
                                    <View
                                        style={{
                                            width: w(25),
                                            height: h(20),
                                            backgroundColor: "#629978",
                                            borderRadius: 50,
                                        }}
                                    ></View>
                                    <Text
                                        style={{
                                            fontSize: 25,
                                            fontWeight: "400",
                                            marginLeft: m(15),
                                        }}
                                    >
                                        Completed
                                    </Text>
                                </Pressable>
                                <Pressable
                                    style={{
                                        flexDirection: "row",
                                        height: h(40),
                                        width: w(340),
                                        alignItems: "center",
                                        backgroundColor: "white",
                                        borderRadius: 15,
                                        padding: p(10),
                                        marginBottom: m(20),
                                    }}
                                    onPress={() => {
                                        setTask((prev) => ({
                                            ...prev,
                                            category: 1,
                                        }));
                                        handleSheetClose();
                                    }}
                                >
                                    <View
                                        style={{
                                            width: w(25),
                                            height: h(20),
                                            backgroundColor: "#E0EB65",
                                            borderRadius: 50,
                                        }}
                                    ></View>
                                    <Text
                                        style={{
                                            fontSize: 25,
                                            fontWeight: "400",
                                            marginLeft: m(15),
                                        }}
                                    >
                                        Continues
                                    </Text>
                                </Pressable>
                                <Pressable
                                    style={{
                                        flexDirection: "row",
                                        height: h(40),
                                        width: w(340),
                                        alignItems: "center",
                                        backgroundColor: "white",
                                        borderRadius: 15,
                                        padding: p(10),
                                    }}
                                    onPress={() => {
                                        setTask((prev) => ({
                                            ...prev,
                                            category: 2,
                                        }));
                                        handleSheetClose();
                                    }}
                                >
                                    <View
                                        style={{
                                            width: w(25),
                                            height: h(20),
                                            backgroundColor: "#F76436",
                                            borderRadius: 50,
                                        }}
                                    ></View>
                                    <Text
                                        style={{
                                            fontSize: 25,
                                            fontWeight: "400",
                                            marginLeft: m(15),
                                        }}
                                    >
                                        Canceled
                                    </Text>
                                </Pressable>
                            </View>
                        ) : (
                            <>
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={isSelectEndDate ? task.endDate : task.startDate}
                                    mode="date"
                                    display="spinner"
                                    onChange={onChange}
                                />
                                <Button title={"OK"} onPress={() => handleSheetClose()} />
                            </>
                        )}
                    </BottomSheet>
                </Portal>
            ) : (
                show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={isSelectEndDate ? task.endDate : task.startDate}
                        display="spinner"
                        mode="date"
                        onChange={onChange}
                    />
                )
            )}
        </View>
    );
}
