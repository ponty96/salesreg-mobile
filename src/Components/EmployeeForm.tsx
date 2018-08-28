import React, { Component } from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native'
import Icon from '../Atom/Icon'
import InputAtom from '../Atom/InputAtom'
import { color } from '../Style/Color'
import SaveCancelButton from '../Container/SaveCancelButton'
import FormInputViewAtom from '../Atom/FormInputViewAtom'

interface IProps {
  navigation: any
}
interface IState {
  newInput?: Array<{ key: number; placeHolder: string; name?: string }>
  firstEmail?: string
}

class EmployeeForm extends Component<IProps, IState> {
  constructor(props?: IProps, context?: any) {
    super(props, context)
    this.state = {
      newInput: [],
      firstEmail: ''
    }
  }
  sendInvitation = () => {
    console.log(this.state)
  }
  onPress = () => {
    if (this.state.newInput === undefined || this.state.newInput.length === 0) {
      let object = this.state.newInput.concat([
        { key: 0, placeHolder: 'Employee Email', name: '' }
      ])
      this.setState({ newInput: object })
    } else {
      let array = this.state.newInput
      let getLastElement = array[array.length - 1]
      let innerKeyAddition = getLastElement.key + 1
      this.setState({
        newInput: [
          ...this.state.newInput,
          { key: innerKeyAddition, placeHolder: 'Employee Email', name: '' }
        ]
      })
    }
  }
  displayState = () => {
    const { newInput } = this.state
    return newInput.map((index: any, key: number) => {
      return (
        <FormInputViewAtom key={key}>
          <View style={styles.flexDirection}>
            <View style={styles.inputSide}>
              <InputAtom
                label={index.placeHolder}
                getValue={val => this.updateStateObj(val, key)}
              />
            </View>
            <View>
              <Icon name="md-close" onPress={() => this.removeInput(key)} />
            </View>
          </View>
        </FormInputViewAtom>
      )
    })
  }
  removeInput = (args: any) => {
    console.log(args)
    let array = [...this.state.newInput]
    array.splice(args, 1)
    this.setState({ newInput: array })
    let newState = Object.assign({}, this.state.newInput)
    newState[args].name = ''
  }
  updateState = (key: string, value: any) => {
    this.setState({ [key]: value })
  }
  updateStateObj = (value: any, args: number) => {
    let newState = Object.assign({}, this.state.newInput)
    newState[args].name = value
  }
  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={90}
        style={styles.customerListContainer}
      >
        <ScrollView>
          <FormInputViewAtom>
            <View style={styles.flexDirection}>
              <View style={styles.inputSide}>
                <InputAtom
                  label={'Employee Email'}
                  getValue={val => this.updateState('firstEmail', val)}
                />
              </View>
              <View>
                <Icon name="md-close" />
              </View>
            </View>
          </FormInputViewAtom>
          {this.displayState()}
          <Text style={styles.blueT} onPress={this.onPress}>
            +Add Email or Phone
          </Text>
        </ScrollView>
        <SaveCancelButton
          navigation={this.props.navigation}
          createfunc={this.sendInvitation}
          positiveButtonName={'SEND INVITATION'}
        />
      </KeyboardAvoidingView>
    )
  }
}

export default EmployeeForm

const styles = StyleSheet.create({
  customerListContainer: {
    flex: 1,
    backgroundColor: '#F6F6F6'
  },
  flexDirection: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputView: {
    width: Dimensions.get('screen').width - 32,
    alignSelf: 'center',
    backgroundColor: color.secondary,
    alignContent: 'center',
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 16,
    borderRadius: 3
  },
  inputSide: {
    width: '90%',
    marginRight: 8
  },
  blueT: {
    fontSize: 16,
    color: color.button,
    padding: 16,
    fontFamily: 'SourceSansPro-Semibold'
  }
})
