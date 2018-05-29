import { StyleSheet } from 'react-native'
import { color } from './Color'

export default StyleSheet.create({
  container: {
    // backgroundColor: '#c0c0c0'
  },

  image: {
    height: 20,
    width: 20,
    padding: 6
  },

  icons: {
    // backgroundColor: '#fff',
    height: 25,
    width: 25
  },
  lilFont: {
    fontSize: 12
    // color: 'black'
  },
  paid: {
    fontSize: 12,
    color: '#c0c0c0'
  },
  balance: {
    fontSize: 10,
    color: '#42c5f4'
  },
  debt: {
    fontSize: 10,
    color: color.primary
  },

  text1: {
    fontSize: 12,
    fontWeight: '200'
  },
  listContainer: {
    // backgroundColor: '#FFF',
    flex: 1,
    width: '100%'
  },
  listView: {
    paddingVertical: 10
  },
  formViewContainer: {
    flex: 1
    // backgroundColor: '#F0F0F0'
  },
  formViewContainer1: {
    flex: 1,
    backgroundColor: '#FFF',
    width: '100%'
  },
  newOrder: {
    flex: 1,
    justifyContent: 'flex-end',
    height: 75,
    marginBottom: 0
  },
  orderContainer: {
    // backgroundColor: '#FFF',
    flex: 1
  },

  greyText: {
    fontSize: 16,
    color: '#c0c0c0',
    paddingLeft: 16
  },
  redText: {
    fontSize: 16,
    color: 'red'
  },

  accordTextL1: {
    textAlign: 'left',
    paddingBottom: 10,
    paddingLeft: 5,
    marginLeft: 0,
    fontWeight: '400'
  },
  wrapAccordText: {
    fontSize: 13,
    color: '#000',
    fontWeight: '400'
  },
  accordTextL2: {
    textAlign: 'left',
    paddingTop: 10,
    paddingLeft: 5,
    marginLeft: 0,
    fontSize: 13,
    color: 'red'
  },
  ababa: {
    flex: 1,
    backgroundColor: '#fff'
  },
  compInner: {
    alignSelf: 'flex-end',
    marginRight: 16
  },
  direct: {
    flexDirection: 'row'
  },
  headerMain: {
    backgroundColor: '#fff',
    width: '100%'
  },
  btnTxt: {
    color: '#000',
    fontSize: 20
  },
  iconic: {
    color: '#000',
    marginBottom: 8
  },
  containerDetails: {
    backgroundColor: '#FFF',
    flex: 1,
    width: '100%',
    alignSelf: 'center'
  },
  footerDetails: {
    height: 70,
    width: '100%'
  },
  butt: {
    borderWidth: 1,
    borderColor: 'darkgrey',
    borderRadius: 2,
    marginVertical: 12
  },
  textyy: {
    color: 'darkgrey',
    fontSize: 16
  },
  foota: {
    height: 80,
    padding: 16
  },
  btnP: {
    alignSelf: 'flex-end'
  },
  txtP: {
    color: '#fff',
    fontSize: 16
  }
})
