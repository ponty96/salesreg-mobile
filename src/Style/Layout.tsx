import { StyleSheet } from 'react-native'
import { color } from './Color'

export default StyleSheet.create({
  menuIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  },

  rowD: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  radioMarginRight: {
    marginRight: 4,
    borderColor: color.primary
  }
})
