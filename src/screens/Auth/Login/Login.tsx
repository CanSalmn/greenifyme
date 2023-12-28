import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Header from "../../../components/Header";
import { IconButton, TextInput, Image } from "../../../components";
import { h, m, w } from "../../../utils";
import { Checkbox } from "react-native-paper";
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
});

export default function Login({ navigation }) {
  const [isCheck, setIsCheck] = useState(false);

  const onPressButton = () => {
    console.log("header icon button pressed");
  };

  const onPressLoginButton = ({ mail, password }) => {
    if (
      mail === userLoginData.usermail &&
      password === userLoginData.password
    ) {
      navigation.navigate("DashBoard");
    } else {
      return;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <Header title={"Log In"} />
   

        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', }}>
          <Formik
            initialValues={{ mail: "", password: "" }}
            validationSchema={validationSchema}
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
                  autoCapitalize="none"
                  placeholder={"Email"}
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

                <Pressable
                  style={{
                    flexDirection: "row",
                    minWidth: w(340),
                    marginLeft: m(20),
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => setIsCheck(!isCheck)}
                >
                  <IconButton
                    icon={
                      isCheck ? "checkbox-blank-outline" : "checkbox-marked-outline"
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
                    Remember me!
                  </Text>
                </Pressable>
                <Button
                  title={"Log In"}
                  onPress={() => handleSubmit()}
                  containerStyle={{ marginTop: m(20) }}
                />
              </View>
            )}
          </Formik>
          <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
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
          <Pressable onPress={() => navigation.navigate("Register")}>
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
              Sign Up
            </Text>
          </Pressable>

        </View>

        <View style={{ justifyContent: 'flex-end', flex: 1, }}>
          <Image
            style={{
              height: h(213),
              width: w(340),
              alignSelf: 'center',
            }}
            source={require("../../../../assets/images/recyclerPeople2.png")}
          />
        </View>

  

    </SafeAreaView>
  );
}

const userLoginData = {
  usermail: "admin@greenifyme.com",
  password: "123456Aa.",
};
