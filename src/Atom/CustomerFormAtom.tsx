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

interface IProps {
  navigation: any
  type: string
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
    phone: 0,
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
            <View style={styles.mainView}>
              <Text style={styles.headerText}>{this.props.firstHeader}</Text>
              <View style={styles.inputViewForTwoAndMore}>
                <View style={styles.innerInputViewForTwo}>
                  <View style={{ width: '25%', alignItems: 'center' }}>
                    <Text style={styles.blueSideText}>Phone</Text>
                  </View>
                  <View style={{ width: '70%' }}>
                    <InputAtom
                      getValue={val => this.updateState('phone', val)}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <View style={styles.innerInputViewForTwo}>
                  <View style={{ width: '25%', alignItems: 'center' }}>
                    <Text style={styles.blueSideText}>Mobile</Text>
                  </View>
                  <View style={{ width: '70%' }}>
                    <InputAtom
                      getValue={val => this.updateState('mobile', val)}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <View style={styles.innerInputViewForTwo}>
                  <View style={{ width: '25%', alignItems: 'center' }}>
                    <Text style={styles.blueSideText}>Fax</Text>
                  </View>
                  <View style={{ width: '70%' }}>
                    <InputAtom
                      getValue={val => this.updateState('fax', val)}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <View style={styles.innerInputViewForTwo}>
                  <View style={{ width: '25%', alignItems: 'center' }}>
                    <Text style={styles.blueSideText}>Email</Text>
                  </View>
                  <View style={{ width: '70%' }}>
                    <InputAtom
                      getValue={val => this.updateState('email', val)}
                      keyboardType="email-address"
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.headerText}>Banking detail</Text>
              <View style={styles.inputView}>
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
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.headerText}>{this.props.secondHeader}</Text>
              <View style={styles.inputView}>
                <InputAtom
                  label="Office Address"
                  getValue={val => this.updateState('officeAddress', val)}
                />
                <InputAtom
                  label="Home Address"
                  getValue={val => this.updateState('homeAddress', val)}
                />
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.headerText}>Billing Address</Text>
              <View style={styles.inputView}>
                <InputAtom
                  label="Billing Address"
                  getValue={val => this.updateState('billingAddress', val)}
                />
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.headerText}>{this.props.thirdHeader}</Text>
              <View style={styles.inputView}>
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
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.headerText}>Other details</Text>
              <View style={styles.inputViewForTwoAndMore}>
                <View style={styles.innerInputViewForTwo}>
                  <View style={{ width: '50%', paddingLeft: 12 }}>
                    <InputAtom
                      label="Birthday"
                      getValue={val => this.updateState('birthday', val)}
                    />
                  </View>
                  <View style={{ width: '50%', paddingRight: 12 }}>
                    <InputAtom
                      label="Marital Status"
                      getValue={val => this.updateState('maritalStatus', val)}
                    />
                  </View>
                </View>
                <View style={styles.innerInputViewForTwo}>
                  <View style={{ width: '50%', paddingLeft: 12 }}>
                    <InputAtom
                      label="Marriage Anniversary"
                      getValue={val => this.updateState('marriageAnn', val)}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.headerText}>Likes</Text>
              <View style={styles.inputView}>
                <InputAtom
                  label="Like"
                  getValue={val => this.updateState('like', val)}
                />
                <ButtonAtom
                  btnText="+ Add Like"
                  transparent={true}
                  onPress={this.addLike}
                  textStyle={styles.sendAnother}
                  btnStyle={{
                    paddingHorizontal: 5,
                    alignSelf: 'flex-start',
                    marginVertical: 3
                  }}
                />
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.headerText}>Dislikes</Text>
              <View style={styles.inputView}>
                <InputAtom
                  label="Dislikes"
                  getValue={val => this.updateState('dislike', val)}
                />
                <ButtonAtom
                  btnText="+ Add Dislike"
                  transparent={true}
                  onPress={this.addDislike}
                  textStyle={styles.sendAnother}
                  btnStyle={{
                    paddingHorizontal: 5,
                    alignSelf: 'flex-start',
                    marginVertical: 3
                  }}
                />
              </View>
            </View>
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
  inputView: {
    width: Dimensions.get('screen').width - 32,
    alignSelf: 'center',
    backgroundColor: color.secondary,
    alignContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    padding: 3,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 3
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
  }
})
