import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { h, m, w } from "../../../utils";
import { Image, TextInput } from "../../../components";
import Button from "../../../components/Button";

export default function ForgotPassword({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
            <View style={{ marginTop: m(70) }}>
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: "600",
                        textAlign: "center",
                        marginBottom: m(20),
                    }}
                >
                    Forgot Password?
                </Text>
                <Text
                    style={{
                        fontSize: 12,
                        lineHeight: 17,
                        color: "#524b6b",
                        textAlign: "center",
                        width: w(314),
                        letterSpacing: 1,
                    }}
                >
                    To reset your password, you need your email or mobile number that can
                    be authenticated
                </Text>
                <Image
                    style={{
                        top: m(20),
                        height: h(120),
                        width: w(340),
                        alignSelf: "center",
                    }}
                    source={require("../../../../assets/images/ForgetPassword.png")}
                />
                <TextInput placeholder={"Email"} style={{ marginTop: m(30) }} />
                <Button
                    title={"Reset Password"}
                    containerStyle={{ marginTop: m(35) }}
                />
                <Pressable onPress={() => navigation.navigate("Login")}>
                    <Text
                        style={{
                            color: "#5DB075",
                            textAlign: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            alignSelf: "center",
                            minWidth: w(340),
                            fontSize: 16,
                            lineHeight: 30,
                            marginTop: m(10),
                        }}
                    >
                        Back to Login
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
