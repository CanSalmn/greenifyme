import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";
import { w, h, m, p } from "../../utils";

const styles = (theme: MD3Theme) => StyleSheet.create({

    container: {
        height: h(40),
        width: w(340),
        alignSelf: "center",
    },
    button: {
        height: "100%",
        width: "auto",
        borderRadius: 25,
        backgroundColor: "#5db075",
        justifyContent: "center",
    },
    title: {
        color: theme.colors.background,
        fontWeight: "bold",
        fontSize: 18,
        lineHeight: 24,
        letterSpacing: 0.3,
        textAlign: "center",
    },

    disabledStyle: {
        backgroundColor: "gray",
    },
});
export default styles;
