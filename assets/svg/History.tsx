import React from 'react';
import Svg, { Circle, Defs, Pattern, Rect, Use,Image } from 'react-native-svg';

export default function SvgComponent(props) {
    return (
        <Svg width="27" height="27" viewBox="0 0 27 27" fill="none"  >
            <Rect width="27" height="27" fill="url(#pattern0)" />
            <Defs>
                <Pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <Use transform="scale(0.002)" />
                </Pattern>
                <Image id="image0_153_373" width="500" height="500" />
            </Defs>
        </Svg>

    );
}
