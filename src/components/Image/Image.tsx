import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image, ImageProps } from "expo-image";
import { w, h, m, p } from "../../utils";


const App: React.FC<ImageProps> = ({
    source,
    ...props
}) => {

    return (
        <Image
            style={{
                width:w(50),
                height:h(50),
                ...(typeof props.style === "object" ? props.style : {}),
            }}
            source={source}
            contentFit="contain"
            transition={500}
            onError={props.onError}
            placeholder={props.placeholder}
            {...props}

        />
    );
};

export default App;

const styles = StyleSheet.create({});
