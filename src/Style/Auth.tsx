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
  container: {
    flex: 1,
    backgroundColor: color.secondary
  },
  wrapper: {
    paddingHorizontal: 32
  },
  signUpText: {
    color: color.primary,
    marginTop: 32,
    alignSelf: 'center'
  },
  boardingScreenFeatureText: {
    marginVertical: '7%',
    marginHorizontal: '10%'
  },
  blueCheck: {
    color: color.blueCheck
  },
  appFunctionWrapper: {
    flexDirection: 'row',
    marginVertical: 10
  },
  appDetailsText: {
    marginLeft: 20,
    color: color.appDetailsText,
    fontSize: 14,
    alignSelf: 'flex-end'
  },
  buttomButtonsWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '88%',
    position: 'absolute',
    bottom: 60
  },
  haveAccount: {
    marginTop: '5%',
    textAlign: 'center',
    color: color.menu
  },
  loginButton: {
    marginVertical: 0,
    paddingHorizontal: 0
  }
})
