import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { IconButton, Image } from "../../components";
import { w, h, m, p } from "../../utils";
import { useNavigation } from "@react-navigation/native";



export default function OnBoarding({ navigation }) {

  const onPressButton = () => {
    navigation.navigate("Login")
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        position: "relative",
        backgroundColor: "#5DB075",
      }}
    >
      <Text style={{ fontSize: 30, fontWeight: "600", marginTop: m(60) }}>
        Save The Earth
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          letterSpacing: 0,
          height: h(110),
          width: w(310),
          textAlign: "center",
          marginTop: m(10),
          color: "#666666",
          lineHeight: 0,
          left: 0,
        }}
      >
        Join the movement towards a cleaner, greener planet with GreenifyMe!
        Your go-to recycling app that turns your eco-friendly efforts into a
        positive impact. Say goodbye to waste and hello to a sustainable future.
      </Text>

      <Image
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          bottom: 0,
          right: m(-16),
          alignSelf: "flex-end",
        }}
        source={require("../../../assets/images/people.png")}
      />
      
      <IconButton
        icon="arrowright"
        iconFamily="AntDesign"
        IconStyle={{
          backgroundColor: "#0F0E0E",
          borderRadius: 50,
          width: w(50),
          height: h(40),
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: m(40),
          right: m(40),
        }}
        size={45}
        iconColor={"white"}
        onPress={onPressButton}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
