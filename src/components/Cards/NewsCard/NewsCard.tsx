import { StyleSheet, Text, ViewStyle } from "react-native";
import React from "react";
import { w, h, m, p } from "../../../utils";
import { LinearGradient } from 'expo-linear-gradient';

interface INewsCard {
    colorGroup: string[];
    newsTitle: string;
    newsStyle?: ViewStyle;
}


const NewsCard: React.FC<INewsCard> = ({ colorGroup, newsTitle, newsStyle }) => {
    return (
        <LinearGradient
            start={{ x: 0.3, y: 0.6 }}
            colors={colorGroup}
            style={[{ marginLeft: m(10), height: h(60), width: w(140), borderRadius: 15, justifyContent: 'center', }, newsStyle]}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '500', marginLeft: m(10) }}>{newsTitle}</Text>
        </LinearGradient >
    );
}
export default NewsCard

const styles = StyleSheet.create({

});
