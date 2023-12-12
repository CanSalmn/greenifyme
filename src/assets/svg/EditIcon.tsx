import React from "react";
import Svg, { Defs, Rect, Path, G, ClipPath } from "react-native-svg";
import { ISvg } from "./Svg.type";

const EditIcon: React.FC<ISvg> = ({
    color = "black",
    fill,
    height = 30,
    width = 30,
}) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 22 22" fill={fill}>
            <G id="Edit Icon" clip-path="url(#clip0_140_310)">
                <Path
                    id="Vector"
                    d="M19.8045 4.86489L16.3721 1.41503C16.1453 1.18936 15.8384 1.06268 15.5184 1.06268C15.1985 1.06268 14.8916 1.18936 14.6648 1.41503L2.49668 13.5656L1.38571 18.3603C1.34739 18.5356 1.3487 18.7172 1.38956 18.8919C1.43041 19.0666 1.50978 19.2299 1.62186 19.37C1.73394 19.5101 1.8759 19.6234 2.03737 19.7016C2.19884 19.7799 2.37575 19.821 2.55516 19.8221C2.63875 19.8305 2.72299 19.8305 2.80659 19.8221L7.65393 18.7111L19.8045 6.57228C20.0301 6.34547 20.1568 6.03853 20.1568 5.71858C20.1568 5.39863 20.0301 5.0917 19.8045 4.86489ZM7.06921 17.6586L2.52592 18.6117L3.56088 14.1561L12.665 5.08708L16.1733 8.59542L7.06921 17.6586ZM16.9569 7.74757L13.4485 4.23924L15.4834 2.2161L18.9332 5.72443L16.9569 7.74757Z"
                    fill={color}
                />
            </G>
            <Defs>
                <ClipPath id="clip0_140_310">
                    <Rect width="21.05" height="21.05" fill="white" />
                </ClipPath>
            </Defs>
        </Svg>
    );
};

export default EditIcon;
