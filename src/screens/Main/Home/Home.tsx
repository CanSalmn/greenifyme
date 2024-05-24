import * as React from "react";
import { Dimensions, ScrollView, Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "react-native-paper";
import { w, h, m, p } from "../../../utils";

import {
    TaskCard,
    NewsCard,
    BalanceCard,
    MaterialsCard,
} from "../../../components/Cards";
import { MaterailData, newsData, TaskData } from "../../../data";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { SafeAreaView } from "react-native-safe-area-context";
import { DragDropButton, Header, IconButton } from "../../../components";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDecay,
} from "react-native-reanimated";
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from "react-native-gesture-handler";
import { DragDropIcon } from "../../../assets/svg";

import { useAppDispatch, useAppSelector } from "../../../redux/Task/hooks";
import { useGetBalance } from "../../../service/Balance/BalanceMutation";
import { useQuery } from "@tanstack/react-query";
import { balance } from "../../../service/Balance";
import { material } from "../../../service/Material";

const SIZE = 80;

export default function Home({ navigation }) {
    const theme = useTheme();
    const dispatch = useAppDispatch();

    const { description, category } = useAppSelector((state) => state.dailyTask);

    const [value, setValue] = React.useState<string>();

    const {
        isPending: isPendingBalance,
        isError: isErrorBalance,
        data: balanceData,
        error: balanceError,
    } = useQuery({
        queryKey: ["balance"],
        queryFn: () => balance(),
    });
    const {
        isPending: isPendingMaterial,
        isError: isErrorMaterial,
        data: materialData,
        error: materialError,
    } = useQuery({
        queryKey: ["material"],
        queryFn: () => material(),
    });

    if (isPendingBalance) {
        return <Text>Loading...</Text>;
    }

    if (isErrorBalance) {
        return <Text>Error: {balanceError.message}</Text>;
    }

    const BottomTabsData = [
        {
            id: "currency-tab",
            title: "Currency",
            icon: <Ionicons name="create" color="#fff" size={25} />,
            activeIcon: <Ionicons name="create" color="#4d4d4d" size={25} />,
        },
        {
            id: "converter-tab",
            title: "Converter",
            icon: <Ionicons name="create" color="#fff" size={25} />,
            activeIcon: <Ionicons name="create" color="#4d4d4d" size={25} />,
        },
        {
            id: "gold-tab",
            title: "Gold",
            icon: <Ionicons name="create" color="#fff" size={25} />,
            activeIcon: <Ionicons name="create" color="#4d4d4d" size={25} />,
        },
        {
            id: "settings-tab",
            title: "Settings",
            icon: <Ionicons name="create" color="#fff" size={25} />,
            activeIcon: <Ionicons name="create" color="#4d4d4d" size={25} />,
        },
    ];

    const onPressEdit = () => {
        console.log("onpressEdit pressed");
    };

    const onPressTrash = () => {
        console.log("onPressTrash pressed");
    };

    const renderNews = ({ item }) => {
        return <NewsCard colorGroup={item.colorGroup} newsTitle={item.newsTitle} />;
    };

    const renderTask = ({ item }) => {
        return (
            <TaskCard
                backgroundColor={item.backgroundColor}
                color={item.color}
                taskTitle={item.taskTitle}
                taskNumber={item.taskNumber}
                onPressEdit={onPressEdit}
                onPressTrash={onPressTrash}
            />
        );
    };
    const renderMaterial = ({ item }) => {
        return (
            <MaterialsCard
                materialTitle={item.materialTitle}
                materialId={item.materialId}
                totalRecycling={item.totalRecycling}
                unit={item.unit}
            />
        );
    };

    const handleTransactionButton = () => {
        console.log("clicked");
        navigation.navigate("Transaction");
    };

    const handleDragDropButton = () => {
        navigation.navigate("Report");
    };

    return (
        <>
            <DragDropButton onPress={handleDragDropButton} />
            <ScrollView 
                style={{
                    position: "relative",
                    flex: 1,
                    height: "100%",
                }}
            >
                <Header title="Home" />

                <View
                    style={{ minHeight: h(100), width: Dimensions.get("screen").width }}
                >
                    <Text
                        style={{
                            color: "#5DB075",
                            fontSize: 24,
                            margin: m(10),
                            fontWeight: "500",
                        }}
                    >
                        News
                    </Text>
                    <FlashList
                        data={newsData}
                        renderItem={renderNews}
                        estimatedItemSize={200}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                <BalanceCard
                    containerStyle={{ alignSelf: "center", marginTop: m(25) }}
                    balanceData={
                        balanceData && balanceData.data ? balanceData.data : null
                    }
                />

                <View
                    style={{ minHeight: h(100), width: Dimensions.get("screen").width }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                color: "#5DB075",
                                fontSize: 24,
                                margin: m(20),
                                fontWeight: "500",
                            }}
                        >
                            Daily Tasks
                        </Text>
                        <IconButton
                            icon="plussquareo"
                            iconFamily="AntDesign"
                            size={30}
                            iconColor={"#5DB075"}
                            onPress={() => navigation.navigate("DailyTask")}
                        />
                    </View>

                    <FlashList
                        data={TaskData}
                        renderItem={renderTask}
                        estimatedItemSize={200}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                <View
                    style={{ minHeight: h(150), width: Dimensions.get("screen").width }}
                >
                    <Text
                        style={{
                            color: "#5DB075",
                            fontSize: 24,
                            margin: m(20),
                            fontWeight: "500",
                        }}
                    >
                        Recycleable Materials
                    </Text>

                    <FlashList
                        data={materialData && materialData.data[0].materials}
                        renderItem={renderMaterial}
                        numColumns={2}
                        estimatedItemSize={200}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </ScrollView>
        </>
    );
}
const styles = StyleSheet.create({});
