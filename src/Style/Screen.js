import { StyleSheet } from 'react-native'
import { color } from './Color'

export default StyleSheet.create(
    {
        centerContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: color.secondary
        },
        paddingHorizontal: {
            paddingHorizontal: 16
        },
        headerIcon: {
            color: color.secondary,
            padding: 16,
            fontSize: 28
        },
        headerIconLogout: {
            color: color.secondary,
            padding: 8,
            fontSize: 28
        },
        headerText: {
            color: color.secondary,
            fontWeight: 'bold',
            paddingRight: 16,
            fontSize: 18
        },
        fab: {
            backgroundColor: color.primary
        },
        headerItem: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
    }
)