
import React from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDecay,
} from 'react-native-reanimated';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { DragDropIcon } from '../../assets/svg';

const SIZE = 85;

export default function DragDropButton({ onPress }: any) {
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(Dimensions.get('window').height / 2);
    const width = useSharedValue(0);
    const height = useSharedValue(0);

    const onLayout = (event) => {
        width.value = event.nativeEvent.layout.width;
        height.value = event.nativeEvent.layout.height;
    };

    const pan = Gesture.Pan()
        .onChange((event) => {
            offsetX.value += event.changeX;
            offsetY.value += event.changeY;

        })
    // .onFinalize((event) => {
    //     offsetX.value = withDecay({
    //         velocity: event.velocityX,
    //         rubberBandEffect: true,
    //         clamp: [-(width.value / 2) + SIZE / 2, width.value / 2 - SIZE / 2],
    //     });
    //     offsetY.value = withDecay({
    //         velocity: event.velocityY,
    //         rubberBandEffect: true,
    //         clamp: [-(width.value / 2) + SIZE / 2, width.value / 2 - SIZE / 2],
    //     });
    // });

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: offsetY.value },
        { translateX: offsetX.value }],
    }));

    return (
        <TouchableOpacity onLayout={onLayout} style={styles.wrapper} onPress={onPress}>
            <GestureDetector gesture={pan}>
                <Animated.View style={[styles.box, animatedStyles]} >
                    <DragDropIcon width={80} height={80} />
                </Animated.View>
            </GestureDetector>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({


    wrapper: {
        flex: 1,
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        position: 'absolute',
        zIndex: 10,


    },
    box: {
        height: SIZE,
        width: SIZE,
        flex: 1,
        backgroundColor: '#006837',
        borderRadius: 999,
        cursor: 'grab',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        zIndex: 10,

    },
});
