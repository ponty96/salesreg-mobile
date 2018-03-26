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
        searchIcon: {
            color: color.secondary,
            padding: 16,
            fontSize: 28
        },
        fab: {
            backgroundColor: color.primary
        }
    }
)