import { StyleSheet } from 'react-native'
import { color } from './Color'

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
            color: 'grey'
        }
    }
)