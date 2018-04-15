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
            borderTopWidth: 2,
            borderColor: color.menu,
            alignSelf: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 16
        },
    }
)