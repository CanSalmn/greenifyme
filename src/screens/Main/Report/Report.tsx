import { View, Text, Dimensions, FlatList } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header, IconButton, Image } from "../../../components";
import { useNavigation } from "@react-navigation/native";
import ReportCard from "../../../components/Cards/ReportCard";
import { MaterailData } from "../../../data";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { h, m, w } from "../../../utils";
import Button from "../../../components/Button";
import { DragDropIcon } from "../../../assets/svg";

export default function Report() {
    const [isReport, setIsReport] = useState<boolean>(false);
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const renderReportCard = ({ item }) => {
        return (
            <ReportCard
                ImageSource={item.ImageSource}
                materialTitle={item.materialTitle}
                amount={item.amount}
            />
        );
    };

    const backgroundColorMain = isReport ? "white" : '#5DB075'

    return (
        <View
            style={{
                flex: 1,
                paddingTop: insets.top,
                paddingLeft: insets.left,
                paddingRight: insets.right,
                marginBottom: insets.bottom,
                backgroundColor: backgroundColorMain,
                justifyContent: 'center',
            }}
        >
            {
                isReport ? (
                    <View style={{ flex: 1, height: 200, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, color: '#5DB075', fontWeight: 'bold' }}>Report is successfully</Text>
                        <Image style={{ width: '100%', height: h(300) }} source={require('../../../../assets/images/SuccessMen.png')} />
                        <Button title={"Go to Home"} onPress={() => navigation.navigate('DashBoard' as never)} />
                    </View>
                ) : (
                    <>
                        <Header
                            // title="Report"
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

                        <View
                            style={{ height: h(50), width: "100%", backgroundColor: "#5DB075" }}
                        />

                        <View
                            style={{
                                flex: 1,
                                minHeight: h(150),
                                width: Dimensions.get('screen').width,
                                borderTopStartRadius: 50,
                                borderTopEndRadius: 50,
                                position: 'relative',
                                backgroundColor: 'white',
                            }}
                        >
                            <View style={{ alignSelf: 'center', position: 'absolute', top: '-15%' }}>
                                <DragDropIcon width={200} height={200} />
                            </View>
                            <FlashList
                                data={MaterailData}
                                renderItem={renderReportCard}
                                estimatedItemSize={200}
                                numColumns={2}
                                refreshing={false}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    paddingTop: 70,
                                    paddingLeft: 70,
                                    paddingRight: 40,
                                    paddingBottom: 30,
                                    padding: 0,
                                    paddingVertical: 0,
                                    paddingHorizontal: 0,
                                }}
                            />
                            <Button title={"REPORT"} onPress={() => setIsReport(true)} />
                        </View>
                    </>

                )
            }

        </View >
    );
}
