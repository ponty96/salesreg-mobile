import { StyleSheet } from 'react-native'
import { color } from './Color'

export default StyleSheet.create({
  container: {
    // backgroundColor: '#c0c0c0'
  },
  row: {
    flexDirection: 'row',
    paddingLeft: 0,
    marginLeft: 0,
    top: 0,
    padding: 10,
    width: '100%',
    height: 75,
    // backgroundColor: '#fff',
    marginBottom: 0.5,
    borderBottomWidth: 0.5,
    borderBottomColor: color.listBorderColor
  },
  rowText1: {
    flex: 1,
    fontWeight: '500',
    fontSize: 12
    // color: '#000'
  },
  rowText2: {
    flex: 1,
    fontSize: 13,
    paddingTop: 12,
    color: color.primary
  },
  rowText3: {
    fontSize: 12
  },
  image: {
    height: 20,
    width: 20,
    padding: 6
  },
  dp: {
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    margin: 8
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
  view1: {
    height: 68,
    alignItems: 'center',
    marginRight: 0,
    paddingRight: 0
  },
  view2: {
    flexDirection: 'column',
    flex: 0,
    paddingLeft: 0,
    marginLeft: 0,
    width: '50%'
  },
  view3: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '20%',
    marginLeft: '10%'
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
  mainList: {
    flex: 1,
    height: 75,
    width: '103%',
    alignSelf: 'center',
    marginRight: 10,
    backgroundColor: '#fff',
    paddingVertical: 8
  },
  mainLeft: {
    flex: 0,
    flexDirection: 'column',
    width: '40%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 0,
    paddingLeft: 0
  },
  viewMargin: {
    marginLeft: 16
  },
  leftText1: {
    textAlign: 'left',
    fontFamily: 'Roboto_medium',
    paddingBottom: 10,
    paddingLeft: 5,
    marginLeft: 0,
    fontWeight: '400'
  },
  wrapText: {
    fontSize: 13,
    color: '#000',
    fontWeight: '400'
  },
  leftText2: {
    textAlign: 'left',
    fontFamily: 'Roboto_medium',
    paddingTop: 10,
    paddingLeft: 5,
    marginLeft: 0,
    fontSize: 13,
    color: '#c0c0c0'
  },
  mainRight: {
    flex: 0,
    flexDirection: 'column',
    marginRight: 16,
    marginLeft: '20%',
    width: '35%'
  },
  rightText: {
    fontWeight: '500',
    fontSize: 13,
    paddingTop: 5
  },
  redList: {
    height: 65,
    width: '100%',
    backgroundColor: 'red',
    paddingLeft: 0,
    marginLeft: 0
  },
  whiteTextL: {
    fontSize: 16,
    color: '#FFF',
    paddingLeft: 16
  },
  whiteTextR: {
    fontSize: 16,
    color: '#FFF'
  },
  whiteList: {
    height: 65,
    width: '100%',
    backgroundColor: '#FFF',
    paddingLeft: 0,
    marginLeft: 0
  },
  blackTextL: {
    fontSize: 16,
    color: '#c0c0c0',
    paddingLeft: 16
  },
  blackTextR: {
    fontSize: 16,
    color: '#000'
  },
  redTextR: {
    fontSize: 16,
    color: 'red'
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
  mainAccord: {
    flex: 1,
    flexDirection: 'row',
    height: 75,
    width: '100%',
    alignSelf: 'center',
    marginRight: 10,
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1
  },
  accordView1: {
    flex: 1,
    flexDirection: 'column',
    width: '40%',
    marginLeft: 0,
    paddingLeft: 0,
    height: 75
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
  accordView2: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 16,
    marginLeft: '20%',
    width: '40%',
    height: 75,
    alignItems: 'flex-end'
  },
  accordTextR: {
    fontWeight: '500',
    fontSize: 13,
    paddingTop: 5,
    paddingBottom: 8
  },
  accordIcon: {
    paddingTop: 4,
    color: '#c0c0c0'
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
