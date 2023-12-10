import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image, ImageProps } from "expo-image";

const App: React.FC<ImageProps> = ({
    source,
    ...props
}) => {

    return (
        <Image
            style={{
                ...(typeof props.style === "object" ? props.style : {}),
            }}
            source={source}
            contentFit="cover"
            transition={500}
            onError={props.onError}
            placeholder={props.placeholder}

        />
    );
};

export default App;

const styles = StyleSheet.create({});
