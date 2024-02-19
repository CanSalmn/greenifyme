import React from "react";
import {
    View,
    StyleSheet,
    PressableProps,
    StyleProp,
    ViewStyle,
    Text,
    Pressable,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";
export type IconLibrary = {
    [key: string]: () => React.ComponentType<any>;
};

const ICON_LIBRARIES: IconLibrary = {
    Feather: () => Feather,
    FontAwesome: () => FontAwesome,
    MaterialCommunityIcons: () => MaterialCommunityIcons,
    AntDesign: () => AntDesign,
    MaterialIcons: () => MaterialIcons,
    EvilIcons: () => EvilIcons,
    Ionicons: () => Ionicons,
    Fontisto: () => Fontisto,
};

export type IconButtonProps = PressableProps & {
    icon?: string;
    iconFamily?:
    | "Feather"
    | "MaterialCommunityIcons"
    | "FontAwesome"
    | "AntDesign"
    | "Ionicons"
    | "EvilIcons"
    | "Fontisto"
    | "MaterialIcons";
    variant?: "text" | "contained" | "outline";
    size?: number;
    iconColor?: string;
    IconStyle?: StyleProp<ViewStyle>;
    onPress?: () => void  ;
    backgroundColor?: string;
    text?: string;
    borderRadius?: number;
    height?: number;
    width?: number;
    SvgIcon?: any;
};
const IconButton: React.FC<IconButtonProps> = ({
    icon,
    iconFamily = "Feather",
    size = 20,
    iconColor = "black",
    text,
    IconStyle,
    onPress,
    SvgIcon,
    borderRadius = 5,
    height,
    width,
    ...rest
}) => {
    const theme = useTheme();
    const Icon: any = ICON_LIBRARIES[iconFamily]();

    return (
        <Pressable
            onPress={onPress}
            style={[IconStyle, styles.container]}
            {...rest}
        >
            {icon ? (
                <Icon name={icon} size={size} color={iconColor} />
            ) : (
                <SvgIcon color={iconColor} height={height} width={width} />
            )}
            {text && <Text>{text}</Text>}
        </Pressable>
    );
};
export default IconButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: 'center',
    },
});
