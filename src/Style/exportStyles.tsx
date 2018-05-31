import { color } from './Color'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  saveCancelButton: {
    borderWidth: 1,
    flex: 1,
    height: 65,
    borderRadius: 0,
    marginVertical: 0,
    marginTop: 8,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: color.grey,
    backgroundColor: color.secondary
  },

  saveCancelButtonText: {
    color: color.menu,
    fontWeight: 'bold'
  },

  customerListContainer: {
    // backgroundColor: '#FFF',
    flex: 1,
    width: '100%'
  },

  customerListHeader: {
    backgroundColor: '#fff',
    width: '100%',
    height: 40
  },

  customerListDirect: {
    flexDirection: 'row'
  },

  customerListDropText: {
    paddingBottom: 10,
    fontSize: 14
  },

  orderListContainer: {
    // backgroundColor: '#FFF',
    flex: 1
  },

  faintPicker: {
    color: color.inactive,
    width: '50%',
    height: 35
  },

  modalButton: {
    marginTop: 32,
    marginBottom: 16,
    marginHorizontal: 16,
    alignSelf: 'flex-end'
  },

  flexfull: {
    flex: 1
  },

  marginRight: {
    marginRight: 8
  },

  modalWarningButton: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 32,
    marginBottom: 16,
    marginHorizontal: 8,
    paddingHorizontal: 0
  },

  redButtonText: {
    color: color.secondary
  },

  loginButton: {
    width: '100%',
    height: '13%',
    justifyContent: 'center'
  },
  noAccount: {
    color: color.menu,
    textAlign: 'center',
    marginTop: '6%'
  },
  resetButton: {
    width: '100%',
    height: '17%',
    justifyContent: 'center'
  }
})
