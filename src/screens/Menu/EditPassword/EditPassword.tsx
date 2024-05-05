import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconButton, Header, TextInput } from "../../../components";
import { ErrorMessage, Formik } from "formik";
import { m, w } from "../../../utils";
import Button from "../../../components/Button";

export default function EditPassword({ navigation }) {
    const insets = useSafeAreaInsets();

    const onPressLoginButton = (val) => {

        navigation.navigate("Settings");
    };

    return (
        <View
            style={{
                flex: 1,
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}
        >
            <Header
                title="Settings"
                headerLeft={
                    <IconButton
                        icon="keyboard-backspace"
                        iconFamily="MaterialIcons"
                        onPress={() => navigation.goBack()}
                        size={30}
                        iconColor="#524B6B"
                        style={{}}
                    />
                }
            />

            <Formik
                initialValues={{
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                }}
                // validationSchema={validationSchema}
                onSubmit={(val: any) => {
                    onPressLoginButton(val);
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
                            placeholder={"Old Password"}
                            value={values.oldPassword}
                            secureTextEntry={true}
                            onBlur={handleBlur("oldPassword")}
                            onChangeText={handleChange("oldPassword")}
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
                            placeholder={"New Password"}
                            value={values.newPassword}
                            secureTextEntry={true}
                            onBlur={handleBlur("newPassword")}
                            onChangeText={handleChange("newPassword")}
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
                            placeholder={"Confirm Password"}
                            value={values.confirmPassword}
                            secureTextEntry={true}
                            onBlur={handleBlur("confirmPassword")}
                            onChangeText={handleChange("confirmPassword")}
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

                        <Button
                            title={"UPDATE"}
                            onPress={() => handleSubmit()}
                            containerStyle={{ marginTop: m(20) }}
                        />
                    </View>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({});
