import {
    StyleSheet,
    Text,
    View,
    ViewStyle,
    Button,
    Pressable,
} from "react-native";
import React from "react";
import { w, h, m, p } from "../../../utils";
import Image from "../../Image";
import IconButton from "../../IconButton";
import { useNavigation } from "@react-navigation/native";
import { TransactionCard } from "../../../components/Cards";
import { DragDropIcon } from "../../../assets/svg";

interface IBalanceCard {
    containerStyle?: ViewStyle;
}

const BalanceCard: React.FC<IBalanceCard> = ({ containerStyle }) => {
    const navigation = useNavigation();
    return (
        <View
            style={[
                {
                    backgroundColor: "#F5F9F9",
                    width: w(340),
                    minHeight: h(105),
                    flexDirection: "column",
                    borderWidth: 1,
                    borderColor: "#e8e8e8",
                    borderRadius: 15,
                },
                containerStyle,
            ]}
        >
            <View
                style={{
                    borderBottomWidth: 1.5,
                    borderBottomColor: "#E8E8E9",
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Image
                        source={require("../../../../assets/svg/Para.svg")}
                        style={{
                            width: w(68),
                            height: h(56),
                            margin: m(10),
                            position: "relative",
                        }}
                    />
                    <Text style={{ fontSize: 24, fontWeight: "400" }}>Balance</Text>
                    <Text
                        style={{
                            marginRight: m(40),
                            fontSize: 24,
                            fontWeight: "700",
                            color: "#5DB075",
                            lineHeight: 36,
                        }}
                    >
                        10 TL
                    </Text>
                </View>
            </View>
            <View style={{}}>
                <TransactionCard
                    SvgIcon={DragDropIcon}
                    title={"Food & Drinks"}
                    date={"24/08/23"}
                    price={20}
                    isExpense={true}
                />
                <TransactionCard
                    SvgIcon={DragDropIcon}
                    title={"Freelancing Work"}
                    date={"22/07/23"}
                    price={22}
                    isExpense={false}
                />
                <TransactionCard
                    SvgIcon={DragDropIcon}
                    title={"Shopping"}
                    date={"22/07/23"}
                    price={80}
                    isExpense={true}
                />
            </View>
            <Pressable
                onPress={() => navigation.navigate("Transaction" as never)}
                style={{
                    position: "absolute",
                    bottom: 5,
                    right: 10,
                }}
            >
                <Text
                    style={{
                        color: "lightblue",
                    }}
                >
                    {" "}
                    Show All
                </Text>
            </Pressable>
        </View>
    );
};

export default BalanceCard;

const styles = StyleSheet.create({});
