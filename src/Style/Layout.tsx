import { StyleSheet, Dimensions } from 'react-native'
import { color } from './Color'

export default StyleSheet.create({
  menuIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  },
  defaultPadding: {
    paddingHorizontal: 16
  },
  sidebarContainer: {
    paddingHorizontal: 8,
    height: Dimensions.get('window').height - 16
  },
  itemsContainer: {
    flex: 4
  },
  formViewContainer: {
    flex: 1,
    backgroundColor: color.secondary
  },
  itemText: {
    flex: 1,
    alignContent: 'center',
    paddingLeft: 12,
    color: color.menu
  },
  itemIcon: {
    color: color.menu
  },
  sidebarItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16
  },
  logoutItem: {
    borderTopWidth: 1,
    borderColor: color.textBorderBottom,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16
  },
  debtItem: {
    borderColor: color.textBorderBottom,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 8,
    marginRight: 16
  },
  itemRightIcon: {
    alignSelf: 'center'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  centerModal: {
    backgroundColor: color.secondary
  },
  modalBody: {
    backgroundColor: color.secondary,
    position: 'absolute',
    top: 90,
    width: '100%',
    marginLeft: '7%'
  },
  sidebarListCont: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: color.textBorderBottom
  },
  debtContainer: {
    paddingRight: 4
  },
  listTextCont: {
    flex: 1,
    justifyContent: 'center'
  },
  boldText: {
    fontWeight: 'bold'
  },
  textIconCont: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: color.textBorderBottom,
    marginRight: 16,
    justifyContent: 'center'
  },
  imageIconCont: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 16,
    justifyContent: 'center'
  },
  innerText: {
    alignSelf: 'center'
  },
  deleteIcon: {
    color: color.textBorderBottom
  },
  listTouchCont: {
    flex: 1,
    flexDirection: 'row'
  },
  dateOrderContainer: {
    flexDirection: 'row',
    flex: 1,
    height: 60,
    backgroundColor: color.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: color.listBorderColor
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: color.inactive
  },
  detailItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 35
  },
  detailText: {
    marginLeft: 20,
    marginRight: 30,
    fontSize: 12
  },
  goldRatingsContainer: {
    alignSelf: 'center',
    justifyContent: 'center'
  },
  addText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#FFDF00',
    fontWeight: '400',
    paddingBottom: 10
  },
  minimalPadding: {
    paddingHorizontal: 8,
    paddingVertical: 16
  },
  rowD: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  radioMarginRight: {
    marginRight: 4,
    borderColor: color.primary
  },
  settingsChildText: {
    color: color.settingsChildText
  }
})
