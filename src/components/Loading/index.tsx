import { View, Text, Dimensions } from 'react-native'
import React, { useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native';

export default function index() {

    return (
        <View >
            <LottieView
                autoPlay
                style={{
                    width: 200,
                    height: 200,
                    backgroundColor: 'transparent',
                }}
                source={require('./loading.json')}
                loop
            />
        </View>
    )
}