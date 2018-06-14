import { StyleSheet } from 'react-native'
import { color } from './Color'

export default StyleSheet.create({
  saveCancelContainer: {
    flexDirection: 'row'
  },
  icon: {
    marginTop: 15,
    color: color.inactive
  },
  itemsContainer: {
    flex: 1,
    width: '96%',
    alignSelf: 'center',
    marginTop: 10,
    paddingBottom: 50
  },
  header: {
    backgroundColor: '#F0F0F0',
    height: 50
  },
  font: {
    fontSize: 12,
    color: '#8c8c8c',
    paddingLeft: 4
  },
  genderPickerStyle: {
    marginTop: 25,
    marginLeft: 10
  },
  buttonsWrapper: {
    marginTop: 20
  },
  placeholderColor: {
    color: color.inactive
  },
  fullWidth: {
    width: '100%',
    paddingHorizontal: 0,
    justifyContent: 'center'
  },
  resetPasswordText: {
    color: color.menu
  },
  resetFormContainer: {
    marginTop: '4%'
  },
  nextButtonContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginVertical: '2%'
  },
  nextText: {
    color: color.button
  },
  nextIcon: {
    color: color.button
  },

  placeholderIcon: {
    color: color.inactive,
    fontSize: 120
  },

  termsText: {
    color: color.menu,
    textAlign: 'center'
  },
  redTermText: {
    color: color.button
  }
})
