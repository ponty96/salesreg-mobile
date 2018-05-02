import { StyleSheet } from 'react-native';
import { color } from './Color';

export default StyleSheet.create({
    container: {
      //backgroundColor: "#c0c0c0"
    },
    row: {
      flexDirection: "row",
      paddingLeft: 0,
      marginLeft: 0,
      top: 0,
      padding: 10,
      width: "100%",
      height: 75,
      //backgroundColor: "#fff",
      marginBottom: 0.5,
      borderBottomWidth: 0.5,
      borderBottomColor: color.listBorderColor
    },
    rowText1: {
      flex: 1,
      fontWeight: "500",
      fontSize: 12,
      //color: "#000"
    },
    rowText2: {
      flex: 1,
      fontSize: 13,
      paddingTop: 12,
      color: color.primary
    },
    rowText3: {
      fontSize: 12
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
    icons: {
      //backgroundColor: "#fff",
      height: 25,
      width: 25
    },
    lilFont: {
      fontSize: 12,
      //color: "black"
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
      color: color.primary
    },
    view1: {
      height: 68,
      alignItems: "center",
      marginRight: 0,
      paddingRight: 0
    },
    view2: {
      flexDirection: "column",
      flex: 0,
      paddingLeft: 0,
      marginLeft: 0,
      width: "50%"
    },
    view3: {
      flex:1,
      flexDirection: "column",
      alignItems: "flex-end",
      width: "20%",
      marginLeft:"10%"
    },
    text1: {
      fontSize: 12,
      fontWeight: "200"
    },
    listContainer: {
        //backgroundColor: "#FFF",
        flex: 1,
        width: "100%"
    },
    listView: {
      paddingVertical: 10
    },
    formViewContainer: {
        flex: 1,
        //backgroundColor: "#F0F0F0"
    },
    newOrder: {
        flex: 1,
        justifyContent: "flex-end",
        height: 75,
        marginBottom: 0
    },
    orderContainer: {
        //backgroundColor: "#FFF",
        flex: 1
    }
  });
