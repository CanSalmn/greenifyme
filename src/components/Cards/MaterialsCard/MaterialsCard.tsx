import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { w, h, m, p } from "../../../utils";
import Image from "../../Image";
import Button from "../../Button";

interface Material {
    materialTitle: string;
    materialId: string;
    totalRecycling: string;
    unit: string;
}

const MaterialsCard: React.FC<Material> = ({
    materialTitle,
    materialId,
    totalRecycling,
    unit,
}) => {
    
    return (
        <View
            style={{
                backgroundColor: "#F5F9F9",
                width: w(160),
                height: h(95),
                borderWidth: 1,
                borderColor: "#e8e8e8",
                borderRadius: 15,
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: m(15),
                marginBottom: m(10),
            }}
        >
            <Image
                source={ImageData[Number(materialId)]}
                style={{
                    width: w(70),
                    height: h(70),
                    margin: m(10),
                }}
            />
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "300" }}>{materialTitle}</Text>
                <Text
                    style={{
                        marginTop: m(15),
                        fontSize: 14,
                        fontWeight: "300",
                        color: "#009245",
                    }}
                >
                    {totalRecycling} {unit}
                </Text>
                {/* <View
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
                </View> */}
            </View>
        </View>
    );
};
const ImageData: { [key: number]: any } = {
    0: require("../../../../assets/images/Home/Glass.png"),
    1: require("../../../../assets/images/Home/Paper.png"),
    2: require("../../../../assets/images/Home/Bataries.png"),
    3: require("../../../../assets/images/Home/Plastic.png"),
    4: require("../../../../assets/images/Home/Metal.png"),
    5: require("../../../../assets/images/Home/Organic.png"),
    6: require("../../../../assets/images/Home/Oil.png"),
};
export default MaterialsCard;

const styles = StyleSheet.create({});
