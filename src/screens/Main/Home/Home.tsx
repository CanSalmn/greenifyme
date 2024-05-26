import * as React from "react";
import {
    Dimensions,
    ScrollView,
    Text,
    View,
    StyleSheet,
    Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "react-native-paper";
import { w, h, m, p } from "../../../utils";

import {
    TaskCard,
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
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useAppDispatch, useAppSelector } from "../../../redux/Task/hooks";
import { useGetBalance } from "../../../service/Balance/BalanceMutation";
import { useQuery } from "@tanstack/react-query";
import { balance } from "../../../service/Balance";
import { material } from "../../../service/Material";
import { slider } from "../../../service/Slider";

const SIZE = 80;

export default function Home({ navigation }) {
    const [sliderKit, setSliderKit] = React.useState({
        sliderLenght: 0,
        activeIndex: 0,
    });
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
    const {
        isPending: isPendingSliderImage,
        isError: isErrorSliderImage,
        data: sliderImageData,
        error: sliderImageError,
    } = useQuery({
        queryKey: ["sliderImage"],
        queryFn: () => slider(),
    });

    if (isPendingBalance || isPendingMaterial || isPendingSliderImage) {
        return <Text>Loading...</Text>;
    }

    if (isErrorBalance) {
        return <Text>Error: {balanceError.message}</Text>;
    }

    if (sliderImageData) {
        // setSliderKit({ ...sliderKit, sliderLenght: sliderImageData.data.length })
        console.log("sliderImageData", sliderImageData.data);
    }

    if (isPendingMaterial) {
        console.log("isPendingMaterial", isPendingMaterial);
    }
    if (isPendingBalance) {
        console.log("isPendingBalance", isPendingBalance);
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
        console.log("item", item);
        return (
            <Image
                source={{ uri: `http://127.0.0.1:8080/${item.filepath}` }}
                style={{ width: Dimensions.get("screen").width, height: 250 }}
                resizeMode='stretch'

            />
        );
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
                    <View style={{ position: "relative" }}>
                        <Carousel
                            data={sliderImageData && sliderImageData.data}
                            renderItem={renderNews}
                            sliderWidth={Dimensions.get("screen").width}
                            itemWidth={Dimensions.get("screen").width}
                            layout="default"
                            autoplay
                            loop
                            autoplayDelay={500}
                            autoplayInterval={3500}
                            activeSlideOffset={0}
                            inactiveSlideScale={1}
                            layoutCardOffset={20}
                            onSnapToItem={(index) =>
                                setSliderKit({ ...sliderKit, activeIndex: index })
                            }
                        />
                        <Pagination
                            dotsLength={sliderImageData && sliderImageData.data.length}
                            activeDotIndex={sliderKit.activeIndex}
                            containerStyle={{
                                position: "absolute",
                                bottom: 0,
                                alignSelf: "center",
                            }}
                            dotStyle={{
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                marginHorizontal: 5,
                                backgroundColor: "#5DB075",
                            }}
                            inactiveDotStyle={{}}
                            inactiveDotOpacity={0.6}
                            inactiveDotScale={0.6}
                        />
                    </View>
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
