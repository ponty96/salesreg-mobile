import { StyleSheet } from 'react-native'
import { color } from './Color'

export default StyleSheet.create({
  smallHeader: {
    height: '15%',
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bigHeader: {
    height: '30%'
  },

  buttomButtonsWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '88%',
    position: 'absolute',
    bottom: 60
  }
})
