import { StyleSheet } from 'react-native'
import { color } from './Color'

export default StyleSheet.create(
    {
        buttonRed: {
            backgroundColor: color.primary,
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
        }
    }
)