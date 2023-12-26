import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { LightTheme } from '../../theme/Colors'
import { Image } from '../../components'
import { w, h, m, p } from "../../utils";


export default function Splash({ navigation }) {


    useEffect(() => {
        console.log("called")
        setTimeout(() => {
            navigation.replace('OnBoarding');

        }, 2000);
    }, [navigation]);


    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#5DB075' }}>

            <Image style={{ width: w(304), height: h(304) }} source={require("../../../assets/images/GreenifyMeLogo.png")} />
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({})




