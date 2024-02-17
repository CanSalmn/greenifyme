import { View, Text } from "react-native";
import React from "react";
import { h, m, p, w } from "../../../utils";
import Image from "../../Image";
import Button from "../../Button";

export default function ReportCard({
  ImageSource,
  amount,
}: any) {
  return (
    <View
      style={{
        width: w(120),
        height: h(120),
        alignItems: "center",
        position: "relative",
      }}
    >
      <Image
        source={ImageSource}
        style={{
          width: w(90),
          height: h(90),
          position: "absolute",
          top: -30,
          zIndex: 1,
        }}
      />
      <View
        style={{
          marginTop: m(10),
          paddingBottom: p(5),
          height: h(90),
          width: w(120),
          backgroundColor: "#F5F9F9",
          borderWidth: 1,
          borderColor: "#e8e8e8",
          borderRadius: 10,
          alignSelf: "flex-end",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#5DB075",
            flexDirection: "row",
            borderRadius: 10,
            width: "80%",
            height: h(20),
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            containerStyle={{ height: h(20), width: w(20) }}
            titleStyle={{ color: "black", fontSize: 25 }}
            title={"-"}
          />
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 15, color: 'black' }}>{amount}</Text>
          </View>
          <Button
            containerStyle={{ height: h(20), width: w(20) }}
            titleStyle={{ color: "black", fontSize: 25 }}
            title={"+"}
          />
        </View>
      </View>
    </View>
  );
}
