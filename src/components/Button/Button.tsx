import React from "react";
import {
  ViewStyle,
  View,
  Pressable,
  StyleSheet,
  PressableProps,
  TextStyle,
  ActivityIndicator,
  Text,
} from "react-native";
import createStyles from "./Button.style";
import { useTheme } from "react-native-paper";

export interface IButton extends PressableProps {
  title: string;
  containerStyle?: ViewStyle | ViewStyle[];
  buttonStyle?: ViewStyle | ViewStyle[];
  titleStyle?: TextStyle | TextStyle[];
  textColor?: string;
  primary?: boolean;
  loading?: boolean;
  isDisabled?: boolean;
  disabledStyle?: ViewStyle | ViewStyle[];
}
const Button: React.FC<IButton> = ({
  title,
  titleStyle,
  containerStyle,
  buttonStyle,
  primary,
  loading,
  disabledStyle,
  isDisabled,
  ...otherProps
}) => {
  const theme = useTheme();
  const styles = createStyles(theme)

  return (
    <Pressable
      {...otherProps}
      style={[styles.container, containerStyle]}
      disabled={isDisabled}
    >
      <View
        style={StyleSheet.flatten([
          styles.button,
          buttonStyle,
          isDisabled && styles.disabledStyle,
          disabledStyle && disabledStyle,
        ])}
        accessible
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={StyleSheet.flatten([styles.title, titleStyle])}>
            {title}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default Button;
