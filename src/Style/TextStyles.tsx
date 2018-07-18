import { color } from './Color'
import { StyleSheet } from 'react-native'

export const textStyles = StyleSheet.create({
  normalText: {
    color: color.principal,
    fontSize: 14,
    fontFamily: 'SourceSansPro'
  },
  greenText: {
    color: color.selling
  }
})
