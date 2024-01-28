import { StyleSheet, View } from "react-native";
import React from "react";
import { TextInput as Input, TextInputProps } from "react-native-paper";
import { w, h, m, p } from "../../utils";
import { useTheme } from "react-native-paper";

const TextInput: React.FC<{ rightIconName?: string, onRightIconPressed?: any } & TextInputProps> = ({
    placeholder,
    label,
    value,
    secureTextEntry,
    onChangeText,
    rightIconName,
    onRightIconPressed,
    ...props
}) => {
    const theme = useTheme();
    const [isSecure, setIsSecure] = React.useState<boolean>(true);
    return (
        <Input
            mode="flat"
            label={label}
            placeholder={placeholder}
            value={value}
            disabled={props.disabled}
            error={props.error}
            underlineColor={"transparent"}
            activeUnderlineColor={"transparent"}
            selectionColor={theme.colors.primary}
            outlineColor={props.outlineColor}
            activeOutlineColor={props.activeOutlineColor}
            placeholderTextColor={"#BDBDBD"}
            onChangeText={onChangeText}
            style={{
                fontSize: 16,
                fontWeight: "500",
                justifyContent: "center",
                alignSelf: 'center',
                backgroundColor: "#E8E8E8",
                borderRadius: 10,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                minHeight: h(40),
                minWidth: w(340),
                marginVertical: m(5),
                ...(typeof props.style === "object" ? props.style : {}),
            }}
            contentStyle={props.contentStyle}
            textColor={props.textColor}
            secureTextEntry={secureTextEntry && isSecure}
            right={
                secureTextEntry ? (
                    <Input.Icon
                        style={{}}
                        onPress={() => {
                            setIsSecure((prev) => !prev);
                            onRightIconPressed()
                        }}
                        icon={isSecure ? "eye-off" : "eye"}
                    />
                ) : (
                    <Input.Icon
                        icon={rightIconName}
                        onPress={() => onRightIconPressed()}
                    />
                )
            }
            {...props}
        />
    );
};

export default TextInput;

const styles = StyleSheet.create({});
