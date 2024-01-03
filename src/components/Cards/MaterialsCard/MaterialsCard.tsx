import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { w, h, m, p } from "../../../utils";
import Image from "../../Image";
import Button from "../../Button";


interface IMaterialsCard {
    ImageSource: string;
    materialTitle: string;
}

const MaterialsCard = ({ ImageSource, materialTitle }) => {
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
                alignSelf: 'center',
                marginBottom: m(15),
            }}
        >
            <Image
                source={ImageSource}
                style={{
                    width: w(82),
                    height: h(70),
                    margin: m(10),
                }}
            />
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={{ marginTop: m(15), fontSize: 18, fontWeight: '300' }}>{materialTitle}</Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        marginTop: m(35),
                        marginRight: m(15),
                    }}
                >
                    <Button
                        containerStyle={{ height: h(30), width: w(40), marginRight: m(20) }}
                        buttonStyle={{ borderRadius: 12, backgroundColor: "#EA7173" }}
                        title={"-"}
                    />
                    <Text style={{ fontSize: 18, marginRight: m(20) }}>5</Text>
                    <Button
                        containerStyle={{ height: h(30), width: w(40) }}
                        buttonStyle={{ borderRadius: 12 }}
                        title={"+"}
                    />
                </View>
            </View>
        </View>
    )
}

export default MaterialsCard

const styles = StyleSheet.create({})