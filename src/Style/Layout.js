import { StyleSheet, Dimensions } from 'react-native'
import { color } from './Color'

export default StyleSheet.create(
    {
        menuIcon: {
            color: color.secondary,
            padding: 16,
            fontSize: 28
        },
        defaultPadding: {
            paddingHorizontal: 16
        },
        sidebarContainer: {
            paddingHorizontal: 8,
            height: Dimensions.get('window').height-16
        },
        itemsContainer: {
            flex: 4
        },
        formViewContainer: {
            flex: 1,
            backgroundColor: color.secondary
        },
        itemText: {
            flex: 1,
            alignContent: 'center',
            paddingLeft: 12,
            color: color.menu
        },
        itemIcon: {
            color: color.menu,
        },
        sidebarItem: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 16
        },
        logoutItem: {
            borderTopWidth: 1,
            borderColor: color.textBorderBottom,
            alignSelf: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 16
        },
        modalContainer: {
            flex: 1,
            backgroundColor: "rgba(0,0,0,.5)",
            justifyContent: "center",
            paddingHorizontal: 20
        },
        centerModal: {
            backgroundColor: "#fff",
        },
        modalBody: {
            backgroundColor: "#fff",
            position: "absolute",
            top: 90,
            width: '100%',
            marginLeft: '7%'
        },
        sidebarListCont: {
            flexDirection: 'row',
            padding: 16,
            borderBottomWidth: 1,
            borderColor: color.textBorderBottom
        },
        listTextCont: {
            flex: 1,
            justifyContent: 'center'
        },
        boldText: {
            fontWeight: 'bold'
        },
        textIconCont: {
            height: 50,
            width: 50,
            borderRadius: 25,
            backgroundColor: '#E8E8E8',
            marginRight: 16,
            justifyContent: 'center'
        },
        imageIconCont: {
            height: 50,
            width: 50,
            borderRadius: 25,
            marginRight: 16,
            justifyContent: 'center'
        },
        innerText: {
            alignSelf: 'center'
        }
    }
)