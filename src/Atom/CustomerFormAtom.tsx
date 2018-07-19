import * as React from 'react'
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  Text
} from 'react-native'
import InputAtom from './InputAtom'
import PickerAtom from './PickerAtom'
import ButtonAtom from './ButtonAtom'
import { ScrollView } from 'react-native-gesture-handler'
import FormImageAtom from './FormImageAtom'
import { Form } from 'native-base'
import { color } from '../Style/Color'
import FormContainerAtom from './FormContainerAtom'
import GoogleInputAtom from './GoogleInputAtom'

interface IProps {
  navigation: any
  type: string
  name: string
  header: string
  firstHeader: string
  secondHeader: string
  thirdHeader: string
}

export default class CustomerFormAtom extends React.Component<IProps, any> {
  state = {
    image: {
      uri: 'http://downloadicons.net/sites/default/files/user-icon-2197.png'
    },
    customerName: '',
    companyName: '',
    phone: 0,
    name: '',
    email: '',
    mobile: 0,
    fax: '',
    bankName: '',
    accountName: '',
    accountNumber: '',
    officeAddress: '',
    homeAddress: '',
    billingAddress: '',
    currency: '',
    birthday: '',
    maritalStatus: '',
    marriageAnn: '',
    like: '',
    dislike: ''
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
  addLike = () => {
    console.log('Like added')
  }
  addDislike = () => {
    console.log('Dislike added')
  }
  addFromContacts = () => {
    console.log('Added From Contacts')
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
              form={this.props.type}
              getName={val => this.updateState('customerName', val)}
              getValue={this.getImage}
              source={this.state.image.uri}
            />
            <FormContainerAtom headerText={this.props.header}>
              <InputAtom
                label={'*' + this.props.name}
                getValue={val => this.updateState('name', val)}
              />
              <InputAtom
                label={'Company Name'}
                defaultValue={this.props.name}
                getValue={val => this.updateState('companyName', val)}
              />
              <ButtonAtom
                btnText="+Add from contacts"
                transparent={true}
                onPress={this.addFromContacts}
                textStyle={styles.sendAnother}
                btnStyle={{
                  paddingHorizontal: 5,
                  alignSelf: 'flex-start',
                  marginVertical: 3
                }}
              />
            </FormContainerAtom>
            <View style={styles.mainView}>
              <Text style={styles.headerText}>{this.props.firstHeader}</Text>
              <View style={styles.inputViewForTwoAndMore}>
                <View style={styles.innerInputViewForTwo}>
                  <View style={styles.sideTextWithInput}>
                    <Text style={styles.blueSideText}>Phone</Text>
                  </View>
                  <View style={styles.width70}>
                    <InputAtom
                      getValue={val => this.updateState('phone', val)}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <View style={styles.innerInputViewForTwo}>
                  <View style={styles.sideTextWithInput}>
                    <Text style={styles.blueSideText}>Mobile</Text>
                  </View>
                  <View style={styles.width70}>
                    <InputAtom
                      getValue={val => this.updateState('mobile', val)}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <View style={styles.innerInputViewForTwo}>
                  <View style={styles.sideTextWithInput}>
                    <Text style={styles.blueSideText}>Fax</Text>
                  </View>
                  <View style={styles.width70}>
                    <InputAtom
                      getValue={val => this.updateState('fax', val)}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <View style={styles.innerInputViewForTwo}>
                  <View style={styles.sideTextWithInput}>
                    <Text style={styles.blueSideText}>Email</Text>
                  </View>
                  <View style={styles.width70}>
                    <InputAtom
                      getValue={val => this.updateState('email', val)}
                      keyboardType="email-address"
                    />
                  </View>
                </View>
              </View>
            </View>
            <FormContainerAtom headerText="Banking detail">
              <InputAtom
                label="Bank name"
                getValue={val => this.updateState('bankName', val)}
              />
              <InputAtom
                label="Account name"
                getValue={val => this.updateState('accountName', val)}
              />
              <InputAtom
                label="Account number"
                getValue={val => this.updateState('accountNumber', val)}
                keyboardType="numeric"
              />
            </FormContainerAtom>
            <FormContainerAtom headerText={this.props.secondHeader}>
              <GoogleInputAtom
                label="Office Address"
                getValue={(val: string) =>
                  this.updateState('officeAddress', val)
                }
              />
              <GoogleInputAtom
                label="Home Address"
                getValue={(val: string) => this.updateState('homeAddress', val)}
              />
            </FormContainerAtom>
            <FormContainerAtom headerText="Billing Address">
              <GoogleInputAtom
                label="Billing Address"
                getValue={(val: string) =>
                  this.updateState('billingAddress', val)
                }
              />
            </FormContainerAtom>
            <FormContainerAtom headerText={this.props.thirdHeader}>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#F3F3F3',
                  padding: 10
                }}
              >
                <PickerAtom
                  list={['Naira (\u20A6)']}
                  style={styles.pickerStyle}
                  placeholder="Select Currency"
                />
              </View>
            </FormContainerAtom>
            <View style={styles.mainView}>
              <Text style={styles.headerText}>Other details</Text>
              <View style={styles.inputViewForTwoAndMore}>
                <View style={styles.innerInputViewForTwo}>
                  <View style={styles.wrappedInputLeft}>
                    <InputAtom
                      label="Birthday"
                      getValue={val => this.updateState('birthday', val)}
                    />
                  </View>
                  <View style={[styles.wrappedInputLeft, { paddingRight: 12 }]}>
                    <InputAtom
                      label="Marital Status"
                      getValue={val => this.updateState('maritalStatus', val)}
                    />
                  </View>
                </View>
                <View style={styles.innerInputViewForTwo}>
                  <View style={styles.wrappedInputLeft}>
                    <InputAtom
                      label="Marriage Anniversary"
                      getValue={val => this.updateState('marriageAnn', val)}
                    />
                  </View>
                </View>
              </View>
            </View>
            <FormContainerAtom headerText="Likes">
              <InputAtom
                label="Like"
                getValue={val => this.updateState('like', val)}
              />
              <ButtonAtom
                btnText="+ Add Like"
                transparent={true}
                onPress={this.addLike}
                textStyle={styles.sendAnother}
                btnStyle={styles.btnStyle}
              />
            </FormContainerAtom>
            <FormContainerAtom headerText="Dislikes">
              <InputAtom
                label="Dislikes"
                getValue={val => this.updateState('dislike', val)}
              />
              <ButtonAtom
                btnText="+ Add Dislike"
                transparent={true}
                onPress={this.addDislike}
                textStyle={styles.sendAnother}
                btnStyle={styles.btnStyle}
              />
            </FormContainerAtom>
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: 150,
    borderRadius: 75,
    marginVertical: 16
  },
  mainView: {
    backgroundColor: 'transparent',
    width: '100%'
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
  inputViewForTwoAndMore: {
    width: Dimensions.get('screen').width - 32,
    alignSelf: 'center',
    backgroundColor: color.secondary,
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
    padding: 3,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 3
  },
  innerStart: {
    width: '50%',
    flex: 1,
    alignSelf: 'flex-start'
  },
  innerEnd: {
    width: '50%',
    flex: 1,
    alignSelf: 'center'
  },
  underText: {
    marginRight: '50%',
    fontSize: 10
  },
  pickerStyle: {
    width: '100%',
    height: 35
  },
  itemsContainer: {
    flex: 4,
    backgroundColor: '#F6F6F6'
  },
  headerText: {
    alignSelf: 'center',
    fontSize: 14,
    color: color.button,
    fontFamily: 'SourceSansPro_Semibold'
  },
  blueSideText: {
    fontSize: 16,
    paddingLeft: 16,
    color: color.button,
    fontFamily: 'SourceSansPro_Semibold'
  },
  sendAnother: {
    color: color.button,
    fontSize: 16,
    fontFamily: 'SourceSansPro_Semibold'
  },
  btnStyle: {
    paddingHorizontal: 5,
    alignSelf: 'flex-start',
    marginVertical: 3
  },
  wrappedInputLeft: {
    width: '50%',
    paddingLeft: 12
  },
  sideTextWithInput: {
    width: '25%',
    alignItems: 'center'
  },
  width70: {
    width: '70%'
  }
})
