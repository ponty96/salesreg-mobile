import {StyleSheet} from "react-native";

export default StyleSheet.create(
    {
        container: {
            flex: 1,
            flexDirection: "column"
        },
        redView: {
            height: "50%",
            backgroundColor: "rgba(218,11,11,59)"
        },
        whiteView: {
            height: "50%",
            flex: 1,
            backgroundColor: "#f0f0f0"
        },
        formContainer: {
            position: "absolute",
            top: 120,
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            width: "90%",
            backgroundColor: "#fff",
            borderRadius: 5
        },
        formInnerLayer: {
            paddingVertical: 32,
            paddingHorizontal: 16,
            width: '100%'
        },
        appName: {
            alignSelf: 'center',
            marginTop: 50,
            marginBottom: 20
        },
        appText: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 24
        }
    }
);