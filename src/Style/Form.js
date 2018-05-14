import { StyleSheet } from 'react-native'
import { color } from './Color';

export default StyleSheet.create(
    {
        buttonRed: {
            backgroundColor: color.redButton,
            paddingHorizontal: 32,
            alignSelf: 'center',
            marginVertical: 8
        },
        buttonTransparent: {
            backgroundColor: color.secondary,
            paddingHorizontal: 32,
            alignSelf: 'center',
            marginVertical: 8
        },
        textRed: {
            color: color.primary
        },
        textTransparent: {
            color: color.secondary
        },
        label: {
            color: color.inactive
        },
        required: {
            color: color.primary
        },
        buttonDisabled: {
            backgroundColor: color.disabled,
            paddingHorizontal: 32,
            alignSelf: 'center',
            marginVertical: 8
        },
        saveCancelContainer: {
            flexDirection: 'row'
        },
        imgContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            height: 150,
            width: 150,
            borderRadius: 75,
            marginVertical: 16
        },
        imgPlaceholderText: {
            fontWeight: 'bold',
            fontSize: 20
        },
        selfAlign: {
            alignSelf: 'center'
        },
        icon: {
            marginTop: 15,
            color: color.inactive
        },
        itemsContainer: {
            flex: 1,
            width: "96%",
            alignSelf: "center",
            marginTop: 10,
            paddingBottom: 50
        },
        itemsContainer1: {
            flex: 1,
            width: "100%",
            alignSelf: "center",
            marginTop: 10,
            paddingBottom: 50
        },
        secondCompartment: {
            borderBottomWidth: 1,
            borderBottomColor: 'lightgrey',
            paddingBottom: 10
        },
        compartmentItemWrapper: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginRight: 25
        },
        compartmentItem: {
            marginLeft: 35,
            color: 'grey'
        },
        header: {
            backgroundColor: "#F0F0F0",
            height: 50,
        },
        font: {
            fontSize: 12,
            color: "#8c8c8c",
            paddingLeft: 4
        },
        genderPickerStyle: {
            marginTop: 25,
            marginLeft: 10
        },
        buttonsWrapper: {
            marginTop: 20
        },
        underneathText: {
            marginLeft: 15,
            color: color.inactive,
            fontSize: 12,
            marginBottom: 25
        },
        font1: {
            fontSize: 11,
            color: "#000",
            paddingLeft: 4
        },
        inputView: {
            flexDirection:"row",
            width: "100%",
            flex:1
        },
        innerStart: {
            flex: 1,
            alignItems: "flex-start",
            alignSelf: "flex-start"
        },
        innerEnd: {
            flex: 1,
            alignItems: "flex-end",
            alignSelf: "flex-end"
        },
        underText: {
            marginRight: "65%",
            fontSize:11
        },
        innerFirstPicker: {
            flex: 1,
            alignItems: "flex-start",
            alignSelf: "flex-start",
            paddingTop: 20
        },
        headerOrder: {
            backgroundColor: "#FFF"
        },
        leftOrder: {
            flex: 1,
            width: "40%",
            flexDirection: "row"
        },
        iconOrder: {
            fontSize: 20,
            color: "#c0c0c0",
            paddingRight: 5
        },
        redColorText: {
            color: "red"
        },
        innerItemContainer: {
            flexDirection:"column",
            alignSelf: "center" ,
            width: "98%"
        },
        cusName: {
            width: "98%",
            height: 70,
            marginBottom: 3,
            borderRadius:2,
            alignSelf: "center" ,
            borderWidth: 1,
            borderColor:"#f0f0f0",
            marginVertical: 16
        },
        btn1: {
            alignSelf: "flex-start",
        },
        txt1: {
            fontWeight: "bold",
            fontSize: 16,
            textAlign: "left"
        },
        bottomSide: {
            width: "100%",
            height: 80,
            flexDirection: "row",
            borderTopColor: "#f0f0f0",
            borderTopWidth:1
        },
        innerBottom: {
            flexDirection: "column",
            alignSelf: "flex-start",
            width: "55%",
            marginTop: 20
        },
        bottomGrey: {
            color:"#c0c0c0",
            paddingLeft: 16
        },
        bottomRed: {
            color:"red",
            paddingLeft: 16
        },
        btn2: {
            alignSelf: "flex-end",
            marginBottom: 15
        },
        txt2: {
            fontWeight: "bold",
            color: "#fff"
        },
        genderPickerStyle: {
            marginTop: 25
        },
        buttonsWrapper: {
            marginTop: 20
        },
        placeholderColor: {
            color: color.inactive
        }
    }
)