import { StyleSheet } from 'react-native'
import { color } from './Color'

export default StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    top: 0,
    padding: 10,
    paddingLeft: 0,
    marginLeft: 0,
    height: 75,
    // backgroundColor: '#fff',
    marginBottom: 0.5,
    borderBottomWidth: 0.5,
    borderBottomColor: color.listBorderColor
  },
  rowD: {
    flex: 1,
    flexDirection: 'row',
    top: 0,
    padding: 10,
    paddingLeft: 0,
    marginLeft: 0,
    height: 65,
    // backgroundColor: '#fff',
    marginBottom: 0.5,
    borderBottomWidth: 0.5,
    borderBottomColor: color.listBorderColor
  },
  rowP: {
    flexDirection: 'row',
    flex: 1,
    top: 0,
    height: 75,
    paddingLeft: 0,
    marginLeft: 0,
    // backgroundColor: '#fff',
    marginBottom: 0.5
  },
  rowText1: {
    fontWeight: '400',
    fontSize: 13,
    // color: '#000',
    textAlign: 'left'
  },
  rowText1D: {
    fontWeight: '400',
    fontSize: 13,
    color: '#000',
    textAlign: 'left'
  },
  rowText2: {
    flex: 1
  },
  rowText3: {
    // color: '#000',
    paddingRight: 18,
    fontSize: 13
  },
  rowText3P: {
    color: '#B10000',
    fontSize: 13,
    textAlign: 'right',
    paddingRight: 5,
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 15
  },
  rowText3D: {
    color: 'rgba(218,11,11,59)',
    fontSize: 13,
    textAlign: 'right',
    paddingRight: 5,
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 15
  },
  rowText3DA: {
    color: 'rgba(218,11,11,59)',
    fontSize: 13,
    textAlign: 'right',
    paddingRight: 5,
    marginTop: 0,
    paddingTop: 3,
    paddingBottom: 10
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
  dpD: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    margin: 8
  },
  dpP: {
    height: 55,
    width: 55,
    marginTop: 0,
    paddingTop: 0,
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
  },
  lilFontD: {
    fontSize: 12,
    paddingRight: 8
  },
  lilFontDA: {
    fontSize: 14,
    paddingRight: 8,
    paddingBottom: 3,
    paddingTop: 5
  },
  paid: {
    fontSize: 12,
    color: '#c0c0c0'
  },
  balance: {
    fontSize: 12,
    color: '#42c5f4'
  },
  debt: {
    fontSize: 12,
    color: 'rgba(218,11,11,59)'
  },
  view1: {
    height: 68,
    width: '20%',
    alignItems: 'center'
  },
  view2: {
    flex: 0,
    paddingLeft: 0,
    marginLeft: 0,
    paddingRight: 0,
    marginRight: 0,
    width: '35%'
  },
  view3: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '35%',
    marginLeft: '20%'
  },
  text1: {
    fontSize: 13,
    fontWeight: '200'
  },
  leftView: {
    height: 55
  },
  bodyView: {
    flex: 2
  },
  rightView: {
    alignSelf: 'flex-end',
    alignItems: 'center'
  },
  leftText: {
    color: '#c0c0c0',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'left',
    paddingLeft: 16
  },
  rightText1: {
    color: '#000',
    fontSize: 14,
    paddingBottom: 8
  },
  rightText2: {
    color: 'red',
    fontSize: 14,
    paddingTop: 8
  },
  debtAccord: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFF'
  }
})
