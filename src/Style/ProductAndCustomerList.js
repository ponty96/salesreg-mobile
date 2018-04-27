import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: "row",
        top: 0,
        padding: 10,
        paddingLeft: 0,
        marginLeft: 0,
        height: 75,
        backgroundColor: "#fff",
        marginBottom: 0.5,
        borderBottomWidth: .5,
        borderBottomColor: "#c0c0c0"
    },
    rowP: {
        flexDirection: "row",
        flex: 1,
        top: 0,
        height: 75,
        paddingLeft: 0,
        marginLeft: 0,
        width: "100%",
        backgroundColor: "#fff",
        marginBottom: 0.5
    },
    rowText1: {
        fontWeight: "500",
        fontSize: 14,
        color: "#000",
        textAlign: "left"
    },
    rowText2: {
        flex: 1
    },
    rowText3: {
        color: "#000",
        paddingRight: 18,
        fontSize: 14
    },
    rowText3P: {
        color: "red",
        fontSize: 14,
        textAlign: "right",
        paddingRight: 5,
        marginTop: 0,
        paddingTop: 0,
        paddingBottom: 15
    },
    image: {
        height: 20,
        width: 20,
        padding: 6
    },
    dp: {
        height: 55,
        width: 55,
        borderRadius: 55 / 2,
        margin: 8
    },
    dpP: {
        height: 55,
        width: 55,
        marginTop: 0,
        paddingTop: 0,
        borderRadius: 55 / 2,
        margin: 8
      },
    icons: {
        backgroundColor: "#fff",
        height: 25,
        width: 25
    },
    lilFont: {
        fontSize: 11
    },
    paid: {
        fontSize: 12,
        color: "#c0c0c0"
    },
    balance: {
        fontSize: 10,
        color: "#42c5f4"
    },
    debt: {
        fontSize: 10,
        color: "rgba(218,11,11,59)"
    },
    view1: {
        height: 68,
        width: "20%",
        alignItems: "center"
    },
    view2: {
        flex: 0,
        paddingLeft: 0,
        marginLeft: 0,
        paddingRight: 0,
        marginRight: 0,
        width: "35%"
    },
    view3: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-end",
        width: "35%",
        marginLeft: "20%"
    },
    text1: {
        fontSize: 14,
        fontWeight: "200"
    },
    leftView: {
        height: 55
    },
    bodyView: {
        flex: 0, 
        width: "55%" 
    }, 
    rightView: { 
        alignSelf: "flex-end", 
        width: "25%", 
        marginLeft: "20%", 
        alignItems: "center"
    },
    container: {
        backgroundColor: "#FFF",
        flex: 1,
        width: "100%"
    }
  });
