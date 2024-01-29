import * as React from "react";
import { ScrollView, Text, View } from "react-native";
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
export default function Home() {
    const navigation = useNavigation();
    const [value, setValue] = React.useState<string>();

    const theme = useTheme();

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
                ImageSource={item.ImageSource}
                materialTitle={item.materialTitle}
            />
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView >
                <Text
                    style={{
                        color: theme.colors.onBackground,
                        fontSize: 25,
                        lineHeight: 30,
                        letterSpacing: -1,
                        fontWeight: "bold",
                        textAlign: "center",
                        padding: p(15),
                    }}
                >
                    {" "}
                    Home
                </Text>

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
                <BalanceCard containerStyle={{ alignSelf: "center", marginTop: m(25) }} />

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
                <FlashList
                    data={TaskData}
                    renderItem={renderTask}
                    estimatedItemSize={200}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />

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
                    data={MaterailData}
                    renderItem={renderMaterial}
                    estimatedItemSize={200}
                    showsHorizontalScrollIndicator={false}

                />
            </ScrollView>
        </SafeAreaView>
    );
}
