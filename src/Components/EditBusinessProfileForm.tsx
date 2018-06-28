import React, { Component } from 'react'
import {
  View,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet
} from 'react-native'
import { CheckBox, Textarea } from 'native-base'
import InputAtom from '../Atom/InputAtom'
import { color } from '../Style/Color'
import FormImageAtom from '../Atom/FormImageAtom'
import PickerAtom from '../Atom/PickerAtom'

interface IProps {}

class EditBusinessProfileForm extends Component<IProps, any> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      image: {
        uri:
          'https://irp-cdn.multiscreensite.com/649127fb/dms3rep/multi/mobile/ic1.png'
      },
      businessName: '',
      check1: true,
      check2: true,
      email: '',
      description: '',
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
  checked1 = () => {
    this.setState({
      check1: !this.state.check1
    })
  }
  checked2 = () => {
    this.setState({
      check2: !this.state.check2
    })
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
          <FormImageAtom
            form="business"
            getName={val => this.updateState('businessName', val)}
            getValue={this.getImage}
            source={this.state.image.uri}
          />
          <View style={styles.mainView}>
            <Text style={styles.headerText}>Contact/Address</Text>
            <View style={styles.inputView}>
              <InputAtom
                label="Email Address"
                getValue={val => this.updateState('email', val)}
                keyboardType="email-address"
              />
              <InputAtom
                label="Address"
                getValue={val => this.updateState('address', val)}
              />
            </View>
          </View>
          <View style={styles.mainView}>
            <Text style={styles.headerText}>What are you selling?</Text>
            <View style={styles.inputView}>
              <View style={styles.checkView}>
                <CheckBox
                  checked={this.state.check1}
                  color={color.selling}
                  onPress={this.checked1}
                />
                <Text style={styles.checkText}>
                  Products (Traders, manufacturers, producers)
                </Text>
              </View>
              <View style={styles.checkView}>
                <CheckBox
                  checked={this.state.check2}
                  color={color.selling}
                  onPress={this.checked2}
                />
                <Text style={styles.checkText}>Services</Text>
              </View>
            </View>
          </View>
          <View style={styles.mainView}>
            <Text style={styles.headerText}>Transaction currency</Text>
            <View style={styles.inputView}>
              <View
                style={{ borderBottomWidth: 1, borderBottomColor: '#F3F3F3' }}
              >
                <PickerAtom
                  list={['Naira (\u20A6)']}
                  style={styles.pickerStyle}
                  placeholder="Select Currency"
                />
              </View>
            </View>
          </View>
          <View style={styles.mainView}>
            <Text style={styles.headerText}>Description</Text>
            <View style={styles.inputView}>
              <Textarea
                rowSpan={5}
                placeholder="Description"
                onChangeText={val => this.updateState('description', val)}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

export default EditBusinessProfileForm

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
    width: '100%',
    height: 35
  },
  headerText: {
    alignSelf: 'center',
    fontSize: 14,
    color: color.button,
    fontFamily: 'SourceSansPro_Semibold'
  },
  checkText: {
    paddingLeft: 16
  },
  checkView: {
    flexDirection: 'row',
    margin: 8
  }
})
