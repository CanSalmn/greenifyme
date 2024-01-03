import { Dimensions, Platform, PixelRatio } from "react-native";

// Ekran genişliği ve yüksekliğini al
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

// Cihazın piksel yoğunluğunu al
const pixelRatio = PixelRatio.get();

// Cihaza göre optimize edilmiş genişlik hesaplama işlevi
const w = (width: number): number => {
    let optimizedWidth = width;

    if (Platform.OS === "android") {
        optimizedWidth = PixelRatio.roundToNearestPixel(
            (screenWidth * width) / 375
        );
    } else if (Platform.OS === "ios") {
        optimizedWidth = PixelRatio.roundToNearestPixel(
            (screenWidth * width) / 375
        );
    }

    return optimizedWidth;
};

// Cihaza göre optimize edilmiş uzunluk hesaplama işlevi
const h = (height: number): number => {
    let optimizedHeight = height;

    if (Platform.OS === "android") {
        optimizedHeight = PixelRatio.roundToNearestPixel(
            (screenHeight * height) / 667
        );
    } else if (Platform.OS === "ios") {
        optimizedHeight = PixelRatio.roundToNearestPixel(
            (screenHeight * height) / 667
        );
    }

    return optimizedHeight;
};

// Cihaza ve platforma göre optimize edilmiş margin hesaplama işlevi
const m = (margin: number): number => {
    let optimizedMargin = margin;

    if (Platform.OS === "android") {
        optimizedMargin = PixelRatio.roundToNearestPixel(
            (screenWidth * margin) / 375
        );
    } else if (Platform.OS === "ios") {
        optimizedMargin = PixelRatio.roundToNearestPixel(
            (screenWidth * margin) / 375
        );
    }

    return optimizedMargin;
};

// Cihaza ve platforma göre optimize edilmiş padding hesaplama işlevi
const p = (padding: number): number => {
    let optimizedPadding = padding;

    if (Platform.OS === "android") {
        optimizedPadding = PixelRatio.roundToNearestPixel(
            (screenWidth * padding) / 375
        );
    } else if (Platform.OS === "ios") {
        optimizedPadding = PixelRatio.roundToNearestPixel(
            (screenWidth * padding) / 375
        );
    }

    return optimizedPadding;
};

export { w, h, m, p };
