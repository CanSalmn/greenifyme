import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Colors } from "../../constants/Colors";
type CircleProps = {
  circleX: Animated.SharedValue<number>;
};
const circleContainerSize = 70;

const AnimatedCircle: FC<CircleProps> = ({ circleX }) => {
  const circleContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: circleX.value - circleContainerSize / 2 }],
    };
  }, []);

  return <Animated.View style={[circleContainerStyle, styles.container]} />;
};

export default AnimatedCircle;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: -circleContainerSize / 1.1,
    width: circleContainerSize,
    borderRadius: circleContainerSize,
    height: circleContainerSize,
    backgroundColor: Colors.secondaryBrandColor,
    justifyContent: "center",
    alignItems: "center",
  },
});
