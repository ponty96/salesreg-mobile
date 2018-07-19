import React, { Component } from 'react'
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet
} from 'react-native'
import { CheckBox, Textarea } from 'native-base'
import InputAtom from '../Atom/InputAtom'
import { color } from '../Style/Color'
import FormImageAtom from '../Atom/FormImageAtom'
import PickerAtom from '../Atom/PickerAtom'
import FormContainerAtom from '../Atom/FormContainerAtom'
import GoogleInputAtom from '../Atom/GoogleInputAtom'

interface IProps {
  name?: string
}

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
          <FormContainerAtom headerText={'Business ID'}>
            <InputAtom
              label={'Business Name'}
              defaultValue={this.props.name}
              getValue={val => this.updateState('name', val)}
            />
          </FormContainerAtom>
          <FormContainerAtom headerText="Contact Address">
            <InputAtom
              label="Email Address"
              getValue={val => this.updateState('email', val)}
              keyboardType="email-address"
            />
            {/*<InputAtom
              label="Address"
              getValue={val => this.updateState('address', val)}
            />*/}
            <GoogleInputAtom
              label="Address City, State"
              getValue={(val: string) => this.updateState('address', val)}
            />
          </FormContainerAtom>
          <FormContainerAtom headerText="What are you selling?">
            <View style={styles.checkView}>
              <CheckBox
                checked={this.state.check1}
                color={color.selling}
                onPress={this.checked1}
                style={styles.checkBox}
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
                style={styles.checkBox}
              />
              <Text style={styles.checkText}>Services</Text>
            </View>
          </FormContainerAtom>
          <FormContainerAtom headerText="Transaction currency">
            <View style={[styles.bottomBorder, { padding: 10 }]}>
              <PickerAtom
                list={['Naira (\u20A6)']}
                style={styles.pickerStyle}
                placeholder="Select Currency"
              />
            </View>
          </FormContainerAtom>
          <FormContainerAtom headerText="Description">
            <View style={styles.bottomBorder}>
              <Textarea
                rowSpan={5}
                placeholder="Description"
                placeholderTextColor={color.inactive}
                onChangeText={val => this.updateState('description', val)}
              />
            </View>
          </FormContainerAtom>
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
  checkBox: {
    left: 0,
    borderWidth: 1,
    paddingBottom: 0,
    paddingLeft: 0,
    marginLeft: 0
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
  checkText: {
    paddingLeft: 16,
    color: color.principal
  },
  checkView: {
    flexDirection: 'row',
    margin: 8
  },
  bottomBorder: {
    borderBottomColor: color.list,
    borderBottomWidth: 1,
    marginLeft: 3,
    marginRight: 3
  }
})
