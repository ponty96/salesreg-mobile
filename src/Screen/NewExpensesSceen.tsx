import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, Dimensions, Text } from 'react-native'
import CustomHeader from '../Components/CustomHeader'
import FormContainerCopy from '../Components/FormContainerCopy'
import InputAtom from '../Atom/InputAtom'
import { color } from '../Style/Color'
import { textStyles } from '../Style/TextStyles'
import PickerAtom from '../Atom/PickerAtom'
import SaveCancelButton from '../Container/SaveCancelButton'
import WarningModal from '../Components/WarningModal'

interface IProps {
  navigation: any
}

interface IState {
  expense?: string
  date?: string
  totalAmount?: string
  visible?: boolean
  excessFormContainer?: any
  payMethod?: string
}

export default class NewExpensesScreen extends Component<IProps, IState> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Expenses"
          onBackPress={() => navigation.goBack()}
        />
      )
    }
  }

  state = {
    expense: '',
    date: '',
    totalAmount: '',
    visible: false,
    paidBy: '',
    excessFormContainer: [<View key={0} />],
    payMethod: ''
  }

  updateState = (key: string, value: any) => {
    this.setState({ [key]: value })
  }

  handleOKPress = () => {
    alert('OK button pressed.')
  }

  additionalElement: JSX.Element[] = []
  index: number = 0

  render() {
    const { navigation } = this.props
    const { excessFormContainer } = this.state
    const element = (index: number): JSX.Element => {
      return (
        <FormContainerCopy
          containerStyle={styles.formContainer}
          innerViewStyle={styles.formWrapper}
          key={this.index}
        >
          <Text
            style={styles.closeSign}
            onPress={() => {
              this.setState({
                excessFormContainer: this.additionalElement
              })
              this.additionalElement.splice(index, 1, undefined)
            }}
          >
            &times;
          </Text>
          <InputAtom
            getValue={val => this.updateState('added', val)}
            inputStyle={{ paddingBottom: 0 }}
          />
          <View style={[styles.innerInputViewForTwo, styles.itemWrapper]}>
            <Text
              style={[
                textStyles.normalText,
                textStyles.blueText,
                styles.leftLabel
              ]}
            >
              Amount
              {'(\u20A6)'}
            </Text>
            <View style={[styles.picker, styles.lastInputWrapper]}>
              <InputAtom
                getValue={val => this.updateState('amount', val)}
                keyboardType="numeric"
                contStyle={styles.bottomSpace}
              />
            </View>
          </View>
        </FormContainerCopy>
      )
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          <FormContainerCopy
            containerStyle={styles.formContainer}
            innerViewStyle={styles.formWrapper}
          >
            <InputAtom
              label="*What do you call this expense"
              placeholder="Shop renovation"
              getValue={val => this.updateState('expense', val)}
            />
            <InputAtom
              label="Date"
              placeholder="06/23/2018"
              getValue={val => this.updateState('date', val)}
            />
          </FormContainerCopy>
          <FormContainerCopy
            containerStyle={styles.formContainer}
            innerViewStyle={styles.formWrapper}
          >
            <View style={[styles.innerInputViewForTwo, styles.itemWrapper]}>
              <Text
                style={[
                  textStyles.normalText,
                  textStyles.blueText,
                  styles.formLeftLabel,
                  styles.totalAmountLabel
                ]}
              >
                {'Total amount(\u20A6)'}
              </Text>
              <View style={[styles.picker, { borderBottomWidth: 0 }]}>
                <InputAtom
                  getValue={val => this.updateState('totalAmount', val)}
                  keyboardType="numeric"
                  inputStyle={{ marginTop: 0 }}
                />
              </View>
            </View>
          </FormContainerCopy>
          <FormContainerCopy
            containerStyle={styles.formContainer}
            innerViewStyle={styles.formWrapper}
          >
            <View
              style={[
                styles.innerInputViewForTwo,
                styles.itemWrapper,
                styles.bottomSpace
              ]}
            >
              <Text
                style={[
                  textStyles.normalText,
                  textStyles.blueText,
                  styles.formLeftLabel,
                  styles.payingMethodText
                ]}
              >
                Paying method
              </Text>
              <View style={styles.picker}>
                <PickerAtom
                  list={['Cash', 'Cheque', 'Direct transfer', 'POS']}
                  placeholder="Cash"
                  handleSelection={val => this.updateState('payMethod', val)}
                  style={{ height: 30 }}
                />
              </View>
            </View>
            <InputAtom
              getValue={val => this.updateState('paidTo', val)}
              label="Paid to"
              placeholder="Ayomide"
              inputStyle={{ paddingBottom: 0 }}
            />
            <View style={[styles.innerInputViewForTwo, styles.itemWrapper]}>
              <Text
                style={[
                  textStyles.normalText,
                  textStyles.blueText,
                  styles.formLeftLabel,
                  styles.paidByLabel
                ]}
              >
                Paid by
              </Text>
              <View style={[styles.picker, styles.paidByInput]}>
                <InputAtom
                  getValue={val => this.updateState('paidBy', val)}
                  inputStyle={{ marginTop: 0 }}
                />
              </View>
            </View>
          </FormContainerCopy>
          {excessFormContainer.map(item => {
            return item
          })}
          <Text
            style={[
              textStyles.bigText,
              textStyles.blueText,
              textStyles.boldText,
              styles.textToAdd
            ]}
            onPress={() => {
              this.additionalElement.push(element(this.index))
              this.setState({
                excessFormContainer: this.additionalElement
              })
              this.index++
            }}
          >
            + Add split
          </Text>
        </ScrollView>
        <SaveCancelButton
          positiveButtonName="DONE"
          navigation={navigation}
          createfunc={() => this.setState({ visible: true })}
        />
        <WarningModal
          headerText="Something's not right!!"
          bodyText={
            'Your total split amount exceeds the total expenses by \u20A6 2000.00. ' +
            'Split total split amountsmust be equal to the total expenses'
          }
          visible={this.state.visible}
          onBackPress={() => this.setState({ visible: false })}
          onPressTopButton={this.handleOKPress}
          modalStyle={styles.modalContainer}
          footerText="OK"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerInputViewForTwo: {
    width: Dimensions.get('screen').width - 32,
    alignSelf: 'center',
    backgroundColor: color.secondary,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemWrapper: {
    paddingLeft: 16,
    marginRight: 16,
    justifyContent: 'space-between'
  },
  baseAlign: {
    alignItems: 'baseline'
  },
  formLeftLabel: {
    width: '30%',
    textAlign: 'right'
  },
  picker: {
    borderBottomWidth: 0.5,
    borderBottomColor: color.dropdown,
    width: '70%',
    marginLeft: 8,
    marginTop: 16
  },
  payingMethodText: {
    alignSelf: 'flex-end'
  },
  lastInputWrapper: {
    borderBottomWidth: 0,
    marginTop: 0,
    width: '80%'
  },
  leftLabel: {
    marginLeft: 6
  },
  textToAdd: {
    marginLeft: 16,
    marginBottom: 64,
    marginTop: 16
  },
  bottomSpace: {
    marginBottom: 10
  },
  formWrapper: {
    marginTop: 0,
    marginBottom: 0
  },
  modalContainer: {
    top: 360
  },
  closeSign: {
    textAlign: 'right',
    fontSize: 30
  },
  formContainer: {
    paddingVertical: -16
  },
  totalAmountLabel: {
    marginTop: 32
  },
  paidByLabel: {
    textAlign: 'left',
    marginLeft: 8,
    alignSelf: 'flex-end',
    marginBottom: 16
  },
  paidByInput: {
    borderBottomWidth: 0,
    marginBottom: 8
  }
})
