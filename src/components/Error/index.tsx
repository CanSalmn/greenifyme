import { View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

export default function index() {

    return (
        <View >
            <LottieView
                autoPlay
                style={{
                    width: 250,
                    height: 250,
                    backgroundColor: 'transparent',
                }}
                source={require('./error.json')}
                loop
            />
        </View>
    )
}