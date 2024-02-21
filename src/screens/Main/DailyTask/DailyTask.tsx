import React, { useRef, useCallback, useState, useMemo } from "react";
import {
    View,
    Text,
    Pressable,
    Platform,
    KeyboardAvoidingView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header, IconButton, TextInput } from "../../../components";
import { useNavigation } from "@react-navigation/native";
import { h, m, p, w } from "../../../utils";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import Button from "../../../components/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAppDispatch, useAppSelector } from "../../../redux/Task/hooks";
import { setCategory, setDespription } from "../../../redux/Task/reducer";

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
    const dispatch = useAppDispatch();
    const { description } = useAppSelector((state) => state.dailyTask);
    const [show, setShow] = useState(false);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const bottomSheetRefCategory = useRef<BottomSheet>(null);
    const [isSelectEndDate, setIsSelectEndDate] = useState<boolean>(false);

    const [task, setTask] = useState<DataType>({
        category: 0,
        startDate: new Date(),
        endDate: new Date(),
        taskDescripton: "",
    });

    const snapPoints = useMemo(() => ["40%"], []);

    const renderBackdrop = (props: any) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={1} />
    );

    const handleSheetChanges = useCallback((index?: number) => {
        isIos ? bottomSheetRef.current?.expand() : setShow(true);
    }, []);

    const handleSheetChangesSecond = useCallback((index?: number) => {
        bottomSheetRefCategory.current?.expand();
    }, []);

    const handleSheetClose = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

    const handleSheetCloseSecond = useCallback(() => {
        bottomSheetRefCategory.current?.close();
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
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Pressable
                    onPress={() => {
                        handleSheetChangesSecond();
                    }}
                >
                    <TextInput
                        editable={false}
                        onPressIn={() => handleSheetChangesSecond()}
                        placeholder="Task Category"
                        value={task.category ? categoryList[task.category - 1].title : null}
                        rightIconName="arrow-down-drop-circle-outline"
                        onRightIconPressed={() => {
                            handleSheetChangesSecond();
                        }}
                    />
                </Pressable>
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
                        onChangeText={(item) => {
                            setTask((prev) => ({
                                ...prev,
                                taskDescripton: item,
                            }));
                            dispatch(setDespription(item));
                        }}
                    />
                    <Button
                        title={"CREATE"}
                        containerStyle={{ marginTop: m(15) }}
                        onPress={() => navigation.navigate("DashBoard" as never)}
                    />
                </View>
            </KeyboardAvoidingView>

            {isIos ? (
                <Portal>
                    <BottomSheet
                        ref={bottomSheetRef}
                        index={-1}
                        style={{ padding: p(20) }}
                        backgroundStyle={{
                            padding: p(10),
                        }}
                        handleStyle={{}}
                        enablePanDownToClose={true}
                        snapPoints={snapPoints}
                        backdropComponent={renderBackdrop}
                    >
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
            <Portal>
                <BottomSheet
                    ref={bottomSheetRefCategory}
                    index={-1}
                    style={{ padding: p(20) }}
                    backgroundStyle={{
                        padding: p(10),
                        backgroundColor: "#F6F6F6",
                    }}
                    handleStyle={{}}
                    enablePanDownToClose={true}
                    snapPoints={snapPoints}
                    backdropComponent={renderBackdrop}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                        }}
                    >
                        {categoryList.map((category, index) => (
                            <Pressable
                                key={index}
                                style={{
                                    flexDirection: "row",
                                    height: h(40),
                                    width: w(340),
                                    alignItems: "center",
                                    backgroundColor: "white",
                                    borderRadius: 15,
                                    margin: m(15),
                                }}
                                onPress={() => {
                                    setTask((prev) => ({
                                        ...prev,
                                        category: category.value,
                                    }));
                                    handleSheetCloseSecond();
                                    dispatch(setCategory(category.value));
                                }}
                            >
                                <View
                                    style={{
                                        width: 25,
                                        height: 25,
                                        backgroundColor: category.color,
                                        borderRadius: 50,
                                        marginLeft: m(15),
                                    }}
                                ></View>
                                <Text
                                    style={{
                                        fontSize: 25,
                                        fontWeight: "400",
                                        marginLeft: m(15),
                                    }}
                                >
                                    {category.title}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </BottomSheet>
            </Portal>
        </View>
    );
}

const categoryList = [
    {
        title: "Completed",
        value: 1,
        color: "#629978",
    },
    {
        title: "Continues",
        value: 2,
        color: "#E0EB65",
    },
    {
        title: "Canceled",
        value: 3,
        color: "#F76436",
    },
];
