import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconButton, Image, } from "../../../components";
import Button from "../../../components/Button";

export default function Scanner() {
  const insets = useSafeAreaInsets();


  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: "center",
          // gap: 100,
        }}
      >

        <Text style={{ fontSize: 30, fontWeight: '600' }} >Scan QR Code</Text>

        <Image style={{ width: 350, height: 350 }} source={require('../../../../assets/images/qrCode.png')} />
        <Button title={"Scan QR Code"} ></Button>
      </View>
    </View>
  );
}
