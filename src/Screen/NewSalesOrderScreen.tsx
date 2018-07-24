import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native'
import CustomHeader from '../Components/CustomHeader'
import SubHeaderAtom from '../Atom/SubHeaderAtom'
import { textStyles } from '../Style/TextStyles'
import FormContainerAtom from '../Atom/FormContainerAtom'
import InputAtom from '../Atom/InputAtom'
import { color } from '../Style/Color'
import PickerAtom from '../Atom/PickerAtom'
import SaveCancelButton from '../Container/SaveCancelButton'
import WarningModal from '../Components/WarningModal'
import ConfirmOrderBody from '../Components/ConfirmOrderBody'

interface IProp {
  navigation: any
}

export default class NewSalesOrderScreen extends Component<IProp, any> {
  static navigationOptions = ({ navigation }: any) => {
    const ORDER_NUMBER = '234432'
    return {
      header: (
        <CustomHeader
          title={'Order: ' + ORDER_NUMBER}
          onBackPress={() => navigation.goBack()}
        />
      )
    }
  }

  state = {
    customer: '',
    item: '',
    quantity: '',
    price: '',
    amount: '',
    taxRate: '',
    amountPaid: '',
    payMethod: '',
    visible: false
  }

  updateState = (key: string, value: any) => {
    this.setState({ [key]: value })
  }

  handleConfirmedPress = () => {
    alert('Continue button pressed.')
  }

  handleEditPress = () => {
    alert("Don't cancel button pressed.")
  }

  render() {
    const TOTAL_AMOUNT: string = '0.00'
    const CONFIRM_ORDER_DATA = {
      NumberSold: '2',
      Amt: '5050.00',
      Tax: '252.50',
      'Total Amt': '5302.50',
      Paid: '3000',
      Balance: '2302.50'
    }
    const { navigation } = this.props

    return (
      <View style={styles.container}>
        <SubHeaderAtom
          screen="sales order"
          image={require('../../assets/Icons/gray-icons/grey-order.png')}
        >
          <Text style={[textStyles.normalText, styles.rightSubheader]}>
            {'Total: ' + '\u20A6 '}
            <Text style={textStyles.greenText}>{TOTAL_AMOUNT}</Text>
          </Text>
        </SubHeaderAtom>
        <ScrollView>
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={65}>
            <FormContainerAtom style={styles.formContainer}>
              <InputAtom
                label="Customer"
                getValue={val => this.updateState('customer', val)}
              />
            </FormContainerAtom>
            <FormContainerAtom style={styles.formContainer}>
              <Text
                style={styles.closeSign}
                onPress={() => alert('Cancel pressed.')}
              >
                &times;
              </Text>
              <InputAtom
                label={
                  navigation.getParam('screen') === 'services'
                    ? 'Service name'
                    : 'Item name'
                }
                getValue={val => this.updateState('item', val)}
                inputStyle={{ marginTop: 0 }}
              />
              <View style={styles.innerInputViewForTwo}>
                <View style={styles.wrappedInputLeft}>
                  <InputAtom
                    label="Quantity"
                    getValue={val => this.updateState('quantity', val)}
                    keyboardType="numeric"
                  />
                </View>
                <View style={[styles.wrappedInputLeft, { paddingRight: 12 }]}>
                  <InputAtom
                    label="Price/each"
                    getValue={val => this.updateState('price', val)}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View style={[styles.wrappedInputLeft, { paddingLeft: 0 }]}>
                <InputAtom
                  label="Amount"
                  getValue={val => this.updateState('amount', val)}
                  keyboardType="numeric"
                />
              </View>
            </FormContainerAtom>
            <Text
              style={[
                textStyles.bigText,
                textStyles.blueText,
                textStyles.boldText,
                styles.textsToAdd
              ]}
              onPress={() => alert('Add item pressed.')}
            >
              + Add Item
            </Text>
            <FormContainerAtom
              style={styles.formContainer}
              containerStyle={styles.containerWrapper}
            >
              <View style={[styles.innerInputViewForTwo, styles.itemWrapper]}>
                <Text
                  style={[
                    textStyles.normalText,
                    textStyles.blueText,
                    styles.taxRate,
                    styles.payingMethodText
                  ]}
                >
                  Paying method
                </Text>
                <View style={[styles.picker, styles.pickerWrapper]}>
                  <PickerAtom
                    list={['Cash', 'Cheque', 'Direct transfer', 'POS']}
                    placeholder="Cash"
                    handleSelection={val => this.updateState('payMethod', val)}
                    style={{ height: 30 }}
                  />
                </View>
              </View>
              <View
                style={[
                  styles.innerInputViewForTwo,
                  styles.itemWrapper,
                  styles.baseAlign
                ]}
              >
                <Text
                  style={[
                    textStyles.normalText,
                    textStyles.blueText,
                    styles.taxRate
                  ]}
                >
                  Tax rate(%)
                </Text>
                <View style={[styles.picker, { borderBottomWidth: 0 }]}>
                  <InputAtom
                    getValue={val => this.updateState('taxRate', val)}
                    keyboardType="numeric"
                    inputStyle={{ marginTop: 0 }}
                  />
                </View>
              </View>
              <View
                style={[
                  styles.innerInputViewForTwo,
                  styles.itemWrapper,
                  styles.baseAlign
                ]}
              >
                <Text
                  style={[
                    textStyles.normalText,
                    textStyles.blueText,
                    styles.taxRate
                  ]}
                >
                  Amount paid
                </Text>
                <View style={[styles.picker, { borderBottomWidth: 0 }]}>
                  <InputAtom
                    getValue={val => this.updateState('amountPaid', val)}
                    keyboardType="numeric"
                    contStyle={styles.amountPaidInput}
                    inputStyle={{ marginTop: 0 }}
                  />
                </View>
              </View>
            </FormContainerAtom>
          </KeyboardAvoidingView>
        </ScrollView>
        <SaveCancelButton
          navigation={this.props.navigation}
          positiveButtonName="DONE"
          createfunc={() => this.setState({ visible: true })}
        />
        <WarningModal
          headerText="Confirm order!"
          bodyText="You cannot undo this action, do you still want to cancel this order ?"
          firstButtonText="Confirmed"
          firstButtonTextColor={color.button}
          secondButtonText="Edit"
          secondButtonTextColor={color.button}
          visible={this.state.visible}
          onBackPress={() => this.setState({ visible: false })}
          onPressTopButton={this.handleConfirmedPress}
          onPressBottomButton={() => this.handleEditPress}
          modalStyle={styles.modalContainer}
        >
          <View style={styles.confirmOrder}>
            <ConfirmOrderBody data={CONFIRM_ORDER_DATA} />
          </View>
        </WarningModal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rightSubheader: {
    marginRight: 8
  },
  formContainer: {
    marginTop: 0,
    marginBottom: 0
  },
  inputViewForTwo: {
    width: Dimensions.get('screen').width - 32,
    alignSelf: 'center',
    backgroundColor: color.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    padding: 3,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 3
  },
  innerInputViewForTwo: {
    width: Dimensions.get('screen').width - 32,
    alignSelf: 'center',
    backgroundColor: color.secondary,
    flexDirection: 'row',
    alignItems: 'center'
  },
  wrappedInputLeft: {
    width: '50%',
    paddingLeft: 12
  },
  textsToAdd: {
    marginLeft: 16,
    marginTop: 16
  },
  closeSign: {
    textAlign: 'right',
    fontSize: 30
  },
  itemWrapper: {
    paddingLeft: 16,
    marginRight: 16
  },
  picker: {
    borderBottomWidth: 1,
    borderBottomColor: color.dropdown,
    width: '70%',
    marginLeft: 8,
    marginTop: 16
  },
  taxRate: {
    width: '30%',
    textAlign: 'right'
  },
  containerWrapper: {
    marginBottom: 32
  },
  modalContainer: {
    top: 175
  },
  confirmOrder: {
    marginBottom: 16
  },
  amountPaidInput: {
    marginBottom: 16
  },
  baseAlign: {
    alignItems: 'baseline'
  },
  payingMethodText: {
    alignSelf: 'flex-end'
  },
  pickerWrapper: {
    marginBottom: 5
  }
})
