import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { w, h, m, p } from "../../../utils";
import Image from "../../Image";
import Button from "../../Button";

const BalanceCard = () => {
    return (
        <View
            style={{
                backgroundColor: "#F5F9F9",
                width: w(315),
                height: h(105),
                borderWidth: 1,
                borderColor: "#e8e8e8",
                borderRadius: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: 'space-between',
            }}
        >
            <Image
                source={require("../../../../assets/svg/Para.svg")}
                style={{
                    width: w(68),
                    height: h(56),
                    margin: m(10),
                    marginLeft: m(45),
                }}
            />
            <Text style={{ fontSize: 24, fontWeight: '400', }}>
                Balance
            </Text>
            <Text style={{ marginRight: m(40), fontSize: 24, fontWeight: '700', color: '#5DB075', lineHeight: 36 }}>
                10 TL
            </Text>
        </View>
    );
};

export default BalanceCard;

const styles = StyleSheet.create({});
