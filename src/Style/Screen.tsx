import { StyleSheet } from 'react-native'
import { color } from './Color'

export default StyleSheet.create({
  orangeText: {
    color: color.warning
  },
  blackText: {
    color: color.black,
    fontWeight: 'bold'
  },
  paddingHorizontal: {
    paddingHorizontal: 16
  },

  modalCloseIcon: {
    flex: 1,
    color: color.inactive,
    paddingLeft: 16
  },
  modalInfoIcon: {
    paddingHorizontal: 8,
    color: color.inactive
  },
  modalWarningIcon: {
    color: color.primary,
    paddingRight: 16
  },
  modalHeaderText: {
    fontSize: 16,
    color: color.menu,
    flex: 4
  },
  modalHeader: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: color.grey
  },
  debtLimitWarning: {
    flexDirection: 'row'
  },
  modalBody: {
    padding: 16
  },
  modalWarningBody: {
    margin: 16
  },
  debtLimitWarningText: {
    textAlign: 'justify'
  },
  modalButtonContainer: {
    marginVertical: 16,
    flexDirection: 'row'
  },
  modalBusinessFooter: {
    marginLeft: 40
  },
  boxView: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: color.inactive,
    padding: 10
  },
  menuColor: {
    color: color.menu
  },
  boxlabel: {
    marginRight: 16
  },

  secondBox: {
    marginBottom: 32
  },
  thumbStyle: {
    height: 30,
    width: 30,
    borderRadius: 15
  },
  trackStyle: {
    height: 8,
    borderRadius: 4
  },
  sliderStyle: {
    marginTop: 16
  },
  legendStyle: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  legendLabel: {
    flex: 1,
    alignSelf: 'flex-start'
  },

  smallCompartment: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: color.textBorderBottom,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  indentLeft: {
    marginLeft: 20
  },
  indentRight: {
    marginRight: 20
  },
  editDetailsWrapper: {
    marginTop: 30,
    marginBottom: 10
  },

  progressBar: {
    position: 'absolute',
    top: '70%',
    left: '30%',
    height: 5,
    borderColor: color.inactive
  }
})
