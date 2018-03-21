import { StyleSheet } from 'react-native'
import { color } from './Color'

export default StyleSheet.create(
    {
        menuIcon: {
            color: color.secondary,
            padding: 16,
            fontSize: 28
        },
        drawerLogo: {
            height: 176,
            paddingHorizontal: 16,
            paddingBottom: 50,
            justifyContent: 'flex-end'
        },
        sidebarContainer: {
            flex: 1
        }
    }
)