import { View, Text } from "react-native";
import React from "react";
import { h, m, p, w } from "../../../utils";
import IconButton from "../../IconButton";
import Image from "../../Image";

export default function CommunityCard({
    imageSource,
    communityMerchantName,
    merchantAddress,
    isSaved,
    setIsSaved,
}) {
    return (
        <View
            style={{
                width: w(340),
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
                rowGap: 5,
                borderRadius: 15,
                backgroundColor: "#E7E7E7",
            }}
        >
            <Image
                source={imageSource}
                contentFit="contain"
                style={{
                    width: w(180),
                    height: h(100),
                }}
            />

            <Text
                style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    letterSpacing: 1.5,
                }}
            >
                {communityMerchantName}
            </Text>

            <Text
                style={{
                    fontSize: 12,
                    fontWeight: "200",
                    letterSpacing: 0,
                    width: w(180),
                    textAlign: 'center',
                    marginVertical: m(5),
                
                }}
            >
                {merchantAddress}
            </Text>

            <IconButton
                style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                }}
                icon={isSaved ? "bookmark" : "bookmark-outline"}
                iconFamily="Ionicons"
                onPress={setIsSaved}
            />
        </View>
    );
}
