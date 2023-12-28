import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Header from "../../../components/Header";
import { IconButton, TextInput, Image } from "../../../components";
import { h, m, w } from "../../../utils";
import { Checkbox, Icon } from "react-native-paper";
import Button from "../../../components/Button";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";

interface Values {
    name: string;
    mail: string;
    password: string;
    repassword: string;
}
const getCharacterValidationError = (str: string) => {
    return `Your password must have at least 1 ${str} character`;
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    mail: Yup.string()
        .email("Please enter a valid email address")
        .required("Required"),
    password: Yup.string()
        .max(40, "to Long!")
        .min(8, "Password must have at least 8 characters")
        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
        .required("Required"),
    repassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
});

export default function Register({ navigation }) {
    const [isCheck, setIsCheck] = useState(false);

    const onPressButton = () => {
        console.log("header icon button pressed");
    };
    return (
        <SafeAreaView style={{ flex: 1, position: "relative" }}>
            <Header
                title={"Sign Up"}
                headerLeft={
                    <IconButton
                        icon="close"
                        iconFamily="EvilIcons"
                        onPress={() => console.log("clicked")}
                        size={20}
                        iconColor="#BDBDBD"
                        //             IconStyle?: StyleProp<ViewStyle>;
                        //         onPress?: () => void;
                        // backgroundColor?: string;

                        style={{}}
                    />
                }
                headerRight={<Text style={{ color:'red'}}>Login</Text>}
                rightStyle={"  alignItems: 'flex-start', backgroundColor:'red"}
                leftStlye={"justifyContent: 'flex-start' "}
            />

            <View
                style={{
                    flex: 2,
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                }}
            >
                <Formik
                    initialValues={{ name: "", mail: "", password: "", repassword: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(val: any) => {
                        console.log("val", val);
                        // handleFormSubmit(val);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <View>
                            <TextInput
                                placeholder={"Name"}
                                value={values.name}
                                secureTextEntry={false}
                                onBlur={handleBlur("name")}
                                onChangeText={handleChange("name")}
                            />
                            <Text
                                style={{
                                    color: "red",
                                    alignSelf: "center",
                                    minWidth: w(340),
                                    fontSize: 16,
                                    marginLeft: m(10),
                                }}
                            >
                                <ErrorMessage name="name" />
                            </Text>
                            <TextInput
                                placeholder={"Email"}
                                autoCapitalize="none"
                                value={values.mail}
                                secureTextEntry={false}
                                onBlur={handleBlur("mail")}
                                onChangeText={handleChange("mail")}
                            />
                            <Text
                                style={{
                                    color: "red",
                                    alignSelf: "center",
                                    minWidth: w(340),
                                    fontSize: 16,
                                    marginLeft: m(10),
                                }}
                            >
                                <ErrorMessage name="mail" />
                            </Text>
                            <TextInput
                                placeholder={"Password"}
                                value={values.password}
                                secureTextEntry={true}
                                onBlur={handleBlur("password")}
                                onChangeText={handleChange("password")}
                            />
                            <Text
                                style={{
                                    color: "red",
                                    alignSelf: "center",
                                    minWidth: w(340),
                                    fontSize: 16,
                                    marginLeft: m(10),
                                }}
                            >
                                <ErrorMessage name="password" />
                            </Text>
                            <TextInput
                                placeholder={"Re-Password"}
                                value={values.repassword}
                                secureTextEntry={true}
                                onBlur={handleBlur("repassword")}
                                onChangeText={handleChange("repassword")}
                            />
                            <Text
                                style={{
                                    color: "red",
                                    alignSelf: "center",
                                    minWidth: w(340),
                                    fontSize: 16,
                                    marginLeft: m(10),
                                }}
                            >
                                <ErrorMessage name="repassword" />
                            </Text>
                            <Pressable
                                style={{
                                    flexDirection: "row",
                                    minWidth: w(340),
                                    marginLeft: m(20),
                                }}
                                onPress={() => setIsCheck(!isCheck)}
                            >
                                <IconButton
                                    icon={
                                        isCheck
                                            ? "checkbox-blank-outline"
                                            : "checkbox-marked-outline"
                                    }
                                    iconFamily="MaterialCommunityIcons"
                                    size={20}
                                    iconColor={"#666666"}
                                />
                                <Text
                                    style={{
                                        marginLeft: m(5),
                                        flex: 1,
                                        letterSpacing: 1,
                                        color: "#666666",
                                    }}
                                >
                                    I would like to receive your newsletter and other promotional
                                    information.
                                </Text>
                            </Pressable>
                            <Button
                                title={"Sign Up"}
                                onPress={() => handleSubmit()}
                                containerStyle={{ marginTop: m(20) }}
                            />
                        </View>
                    )}
                </Formik>
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
                        Forgot your password?
                    </Text>
                </Pressable>
            </View>

            <View style={{ justifyContent: "flex-end", flex: 1 }}>
                <Image
                    style={{
                        height: h(213),
                        width: w(340),
                        alignSelf: "center",
                    }}
                    source={require("../../../../assets/images/recyclerKids.png")}
                />
            </View>
        </SafeAreaView>
    );
}
