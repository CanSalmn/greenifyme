import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, ButtonProps } from "react-native-paper";

const App: React.FC<ButtonProps> = ({
    icon,
    onPress,
    buttonColor,
    children,
    disabled,
    textColor,
    ...props
}) => {
    return (
        <Button
            mode="contained"
            icon={icon}
            onPress={onPress}
            compact={props.compact}
            buttonColor={buttonColor}
            textColor={textColor}
            rippleColor={props.rippleColor}
            disabled={disabled}
            uppercase={props.uppercase}
            accessibilityLabel={props.accessibilityLabel}
            accessibilityHint={props.accessibilityHint}
            contentStyle={props.contentStyle}
            style={{ ...(typeof props.style === "object" ? props.style : {}) }}
            labelStyle={props.labelStyle}
        >
            {children}
        </Button>
    );
};

export default App;

const styles = StyleSheet.create({});
