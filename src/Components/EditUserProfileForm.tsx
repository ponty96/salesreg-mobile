import React, { Component } from 'react'
import {
  View,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet
} from 'react-native'
import { Form } from 'native-base'
import InputAtom from '../Atom/InputAtom'
import { color } from '../Style/Color'
import FormImageAtom from '../Atom/FormImageAtom'

interface IProps {
  phoneNumber?: string
}

class EditUserProfileForm extends Component<IProps, any> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      image: {
        uri: 'http://downloadicons.net/sites/default/files/user-icon-2197.png'
      },
      userName: '',
      phone: '',
      email: '',
      address: ''
    }
  }
  getImage = (pic: any) => {
    this.setState((prevState: any) => ({
      image: {
        ...prevState.image,
        uri: pic
      }
    }))
  }
  updateState = (key: string, value: any) => {
    this.setState({ [key]: value })
  }
  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={60}
        style={styles.itemsContainer}
      >
        <ScrollView>
          <Form>
            <FormImageAtom
              form="user"
              getName={val => this.updateState('userName', val)}
              getValue={this.getImage}
              source={this.state.image.uri}
            />
            <View style={styles.mainView}>
              <Text style={styles.headerText}>Contact</Text>
              <View style={styles.inputView}>
                <InputAtom
                  label="Phone Number"
                  defaultValue={this.props.phoneNumber}
                  getValue={val => this.updateState('phone', val)}
                  keyboardType="numeric"
                />
                <InputAtom
                  label="Email Address"
                  getValue={val => this.updateState('email', val)}
                  keyboardType="email-address"
                />
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.headerText}>Address</Text>
              <View style={styles.inputView}>
                <InputAtom
                  label="Business Address"
                  getValue={val => this.updateState('address', val)}
                />
              </View>
            </View>
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

export default EditUserProfileForm

const styles = StyleSheet.create({
  indentLeft: {
    marginLeft: 20
  },
  indentRight: {
    marginRight: 20
  },
  mainView: {
    backgroundColor: 'transparent',
    width: '100%'
  },
  inputView: {
    width: Dimensions.get('screen').width - 32,
    alignSelf: 'center',
    backgroundColor: color.secondary,
    alignContent: 'center',
    padding: 3,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 3
  },
  editDetailsWrapper: {
    marginTop: 30,
    marginBottom: 10
  },
  textTitle: {
    color: color.inactive,
    fontWeight: '400',
    fontSize: 14
  },
  itemsContainer: {
    flex: 4,
    backgroundColor: '#F6F6F6'
  },
  pickerStyle: {
    width: 130,
    height: 35
  },
  headerText: {
    alignSelf: 'center',
    // marginTop: 8,
    // marginBottom: 16,
    fontSize: 14,
    color: color.button,
    fontFamily: 'SourceSansPro_Semibold'
  }
})
