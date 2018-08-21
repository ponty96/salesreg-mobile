import React, { Component } from 'react'
import {
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Alert
} from 'react-native'
import ListItemAtom from '../Atom/ListItemAtom'
import ListItemWithImage from '../Components/ListItemWithImage'
import { color } from '../Style/Color'
import CustomHeader from '../Components/CustomHeader'
import FormContainerAtom from '../Atom/FormContainerAtom'
import InputAtom from '../Atom/InputAtom'
import SaveCancelButton from '../Container/SaveCancelButton'
import WarningModal from '../Components/WarningModal'

interface IState {
  amountPaid: string
  visibility: boolean
}

export default class InvoicePaymentScreen extends Component<IState> {
  balanceStatus: any = undefined
  difference: number = undefined

  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Invoice payment"
          onBackPress={() => navigation.goBack()}
        />
      )
    }
  }

  updateState = (key: string, value: any) => {
    this.setState({ [key]: value })
  }

  valueStyle = (index: number): object => {
    if (index <= 2) return styles.modalListValue
    return [styles.modalListValue, { color: color.principal }]
  }

  renderModalDetails = (data: {}) => {
    this.balanceStatus = (
      previousBalance: string,
      amountPaid: string
    ): string => {
      this.difference = parseInt(previousBalance, 10) - parseInt(amountPaid, 10)
      if (this.difference >= 0) return color.red
      return color.button
    }

    const currentBalanceColor: string = this.balanceStatus(
      data['Previous balance'].replace(/,/g, ''),
      data['Amount paid'].replace(/,/g, '')
    )

    return Object.keys(data).map((item, index) => {
      return (
        <View
          style={
            index !== 2
              ? styles.modalBody
              : [styles.modalBody, styles.modalHeader]
          }
          key={index}
        >
          <View style={styles.modalBodyTextWrapper}>
            <Text style={styles.modalListLabel}>{item}:</Text>
          </View>
          <View style={styles.modalBodyTextWrapper}>
            <Text
              style={
                index !== 2
                  ? this.valueStyle(index)
                  : [styles.modalListValue, { color: currentBalanceColor }]
              }
            >
              {index <= 2 ? '\u20A6 ' + data[item] : data[item]}
            </Text>
          </View>
        </View>
      )
    })
  }

  state = {
    amountPaid: '0.00',
    date: '06/23/2018',
    visibility: false
  }

  render() {
    const { navigation }: any = this.props
    const { visibility, amountPaid, date }: any = this.state
    const MODAL_BODY_DATA: object = {
      'Previous balance': '1,000.00',
      'Amount paid': '1,600.00',
      'Current balance': this.difference,
      'Payment date': '06/23/2018',
      'Balance due date': '06/30/2018'
    }

    return (
      <ScrollView style={styles.container}>
        <ListItemAtom
          label="INVOICE ID"
          value="#00023"
          labelStyle={styles.listLabel}
          rightTextStyle={styles.transactionID}
          listItemStyle={styles.listWrapper}
        />
        <ListItemWithImage
          label="Paid by"
          bottomText="Chito Omenemeh"
          picStyle={styles.avatar}
          listItemStyle={styles.listWrapper}
        />
        <ListItemAtom
          label="TOTAL DUE"
          value={'\u20A6 ' + '21,000.00'}
          labelStyle={styles.listLabel}
          rightTextStyle={[styles.transactionID, styles.redText]}
          listItemStyle={styles.listWrapper}
        />
        <KeyboardAvoidingView behavior="padding">
          <FormContainerAtom
            inputStyle={styles.formWrapper}
            style={styles.form}
          >
            <View style={styles.innerInputViewForTwo}>
              <Text style={styles.formInputLabel}>{'Amount paid(\u20A6)'}</Text>
              <View style={{ paddingBottom: 20 }}>
                <InputAtom
                  placeholder={amountPaid}
                  getValue={val => this.updateState('amountPaid', val)}
                  contStyle={styles.inputWrapper}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={styles.innerInputViewForTwo}>
              <Text style={styles.formInputLabel}>{'Payment date'}</Text>
              <View style={{ paddingBottom: 20 }}>
                <InputAtom
                  placeholder={date}
                  getValue={val => this.updateState('date', val)}
                  contStyle={styles.inputWrapper}
                />
              </View>
            </View>
          </FormContainerAtom>
          <FormContainerAtom
            inputStyle={styles.formWrapper}
            style={[styles.form, styles.lastForm]}
          >
            <InputAtom
              placeholder="Balance due date"
              getValue={val => this.updateState('dueDate', val)}
            />
            <Text style={styles.underneathText}>Leave blank if no date</Text>
          </FormContainerAtom>
        </KeyboardAvoidingView>
        <SaveCancelButton
          positiveButtonName="DONE"
          navigation={navigation}
          createfunc={() => this.setState({ visibility: true })}
        />
        <WarningModal
          visible={visibility}
          onBackPress={() => this.setState({ visibility: false })}
          onPressTopButton={() => Alert.alert('Confirmed pressed.')}
          onPressBottomButton={() => Alert.alert('Edit pressed.')}
          headerText="Confirm Payment!"
          footerText="Close"
          firstButtonText="Confirmed"
          secondButtonText="Edit"
          modalStyle={styles.modalWrapper}
          firstButtonStyle={styles.confirmedButton}
          headerStyle={styles.modalHeader}
          firstButtonTextColor={color.button}
          secondButtonTextColor={color.button}
        >
          {this.renderModalDetails(MODAL_BODY_DATA)}
          {this.difference < 0 ? (
            <View style={styles.modalDetailsWrapper}>
              <Text style={styles.modalDetailsText}>
                {'Chito'} paid an excess of {'\u20A6 600. '}
                Select {'Chito'} in customer {'\n'}
                contacts to edit the excess.
              </Text>
            </View>
          ) : (
            undefined
          )}
        </WarningModal>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  avatar: {
    alignSelf: 'flex-end'
  },
  listLabel: {
    color: color.principal,
    fontFamily: 'SourceSansPro'
  },
  transactionID: {
    color: color.principal,
    fontFamily: 'SourceSansPro_Semibold',
    marginRight: 16
  },
  listWrapper: {
    backgroundColor: color.secondary
  },
  redText: {
    color: color.red
  },
  formWrapper: {
    marginTop: 0,
    marginBottom: 0
  },
  innerInputViewForTwo: {
    width: Dimensions.get('screen').width - 32,
    alignSelf: 'center',
    backgroundColor: color.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 0
  },
  formInputLabel: {
    width: '30%',
    textAlign: 'right',
    color: color.button,
    fontFamily: 'SourceSansPro',
    fontSize: 14
  },
  form: {
    paddingVertical: 0
  },
  inputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: color.dropdown,
    width: '63%',
    marginLeft: 8
  },
  underneathText: {
    fontSize: 12,
    fontFamily: 'SourceSansPro',
    color: color.principal,
    marginLeft: 10
  },
  lastForm: {
    marginBottom: 32
  },
  modalWrapper: {
    top: 140
  },
  modalBody: {
    flexDirection: 'row'
  },
  modalListLabel: {
    fontFamily: 'SourceSansPro',
    fontSize: 14,
    color: color.button,
    textAlign: 'right'
  },
  modalListValue: {
    fontFamily: 'SourceSansPro',
    fontSize: 14,
    color: color.selling,
    marginLeft: 8
  },
  modalBodyTextWrapper: {
    flex: 1
  },
  confirmedButton: {
    marginTop: 32
  },
  modalHeader: {
    marginBottom: 16
  },
  modalDetailsText: {
    color: color.red,
    fontSize: 14,
    fontFamily: 'SourceSansPro',
    textAlign: 'center'
  },
  modalDetailsWrapper: {
    width: '65%',
    marginTop: 16
  }
})
