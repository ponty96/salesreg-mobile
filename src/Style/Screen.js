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
        plainContainer: {
            flex: 1,
            paddingHorizontal: 16,
            paddingTop: 32,
            backgroundColor: color.secondary
        },
        emptyHolder: {
            backgroundColor: color.grey,
            paddingHorizontal: 16,
            paddingVertical: 32,
        },
        emptyHeader: {
            marginBottom: 16,
            color: color.primary,
            fontSize: 18
        },
        redText: {
            color: color.primary
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
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        nameDisplay: {
            borderBottomWidth: 1,
            borderBottomColor: 'lightgrey',
            paddingBottom: 40,
            paddingTop: 30,
            paddingHorizontal: 40
        },
        modalCloseIcon: {
            color: color.inactive
        },
        modalWarningIcon: {
            color: color.primary
        },
        modalHeaderText: {
            flex: 1
        },
        modalHeader: {
            padding: 16,
            backgroundColor: color.grey
        }
    }
)