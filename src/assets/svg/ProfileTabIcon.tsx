import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

export default function Map({ color, fill }: any) {
    return (
        <Svg width="34" height="35" viewBox="0 0 34 35" fill="none" >
        <Path d="M17 20C20.4518 20 23.25 17.2018 23.25 13.75C23.25 10.2982 20.4518 7.5 17 7.5C13.5482 7.5 10.75 10.2982 10.75 13.75C10.75 17.2018 13.5482 20 17 20Z" stroke={color} stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M6.32495 29.75C7.44056 27.9188 9.00847 26.4054 10.878 25.3552C12.7475 24.305 14.8557 23.7534 17 23.7534C19.1442 23.7534 21.2524 24.305 23.1219 25.3552C24.9914 26.4054 26.5593 27.9188 27.675 29.75" stroke={color} stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M17 33.75C25.9746 33.75 33.25 26.4746 33.25 17.5C33.25 8.52537 25.9746 1.25 17 1.25C8.02537 1.25 0.75 8.52537 0.75 17.5C0.75 26.4746 8.02537 33.75 17 33.75Z" stroke={color} stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>

    )
}