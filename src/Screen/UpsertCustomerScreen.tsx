import React, { PureComponent } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import InputAtom from '../Atom/InputAtom';
import PickerAtom from '../Atom/PickerAtom';
import ButtonAtom from '../Atom/ButtonAtom';
import FormImageAtom from '../Atom/FormImageAtom';
import { Form } from 'native-base';
import { color } from '../Style/Color';
import FormContainerAtom from '../Atom/FormContainerAtom';
import GoogleInputAtom from '../Atom/GoogleInputAtom';
import FormContainerWrappedAtom from '../Atom/FormContainerWrappedAtom';
import SaveCancelButton from '../Container/SaveCancelButton';
import { ScrollView } from 'react-native-gesture-handler';
import CustomHeader from '../Components/CustomHeader';

interface IProps {
  navigation: any;
}

interface IState {}

class UpsertCustomerScreen extends PureComponent<IProps, IState> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Customer"
          onBackPress={() => navigation.goBack()}
        />
      )
    };
  };
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
  };
  create = () => {
    this.props.navigation.goBack();
  };

  updateState = (key: string, value: any) => {
    this.setState({ [key]: value });
  };

  getImage = (_pic: any) => {};

  addFromContacts = () => {
    console.log('Added From Contacts');
  };

  addLike = () => {
    console.log('Like added');
  };
  addDislike = () => {
    console.log('Dislike added');
  };

  render() {
    return (
      <View style={styles.ababa}>
        <ScrollView>
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={60}
            style={styles.itemsContainer}
          >
            <ScrollView>
              <Form>
                <FormImageAtom
                  form={'customer'}
                  getValue={this.getImage}
                  source={this.state.image.uri}
                />
                <FormContainerAtom headerText={'Customer ID'}>
                  <InputAtom
                    // label={'*' + this.props.name}
                    getValue={val => this.updateState('name', val)}
                  />
                  <InputAtom
                    label={'Company Name'}
                    // defaultValue={this.props.name}
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
                <FormContainerAtom headerText={'Customer contact'}>
                  <InputAtom
                    getValue={val => this.updateState('phone', val)}
                    keyboardType="numeric"
                    key="phone"
                    label="Phone"
                  />
                  <InputAtom
                    getValue={val => this.updateState('mobile', val)}
                    keyboardType="numeric"
                    key="mobile"
                    label="Mobile"
                  />
                  <InputAtom
                    getValue={val => this.updateState('fax', val)}
                    keyboardType="numeric"
                    key="fax"
                    label="Fax"
                  />
                  <InputAtom
                    getValue={val => this.updateState('email', val)}
                    keyboardType="email-address"
                    key="email"
                    label="Email Address"
                  />
                </FormContainerAtom>
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
                <FormContainerAtom headerText={'Customer Address'}>
                  <GoogleInputAtom
                    label="Office Address"
                    getValue={(val: string) =>
                      this.updateState('officeAddress', val)
                    }
                  />
                  <GoogleInputAtom
                    label="Home Address"
                    getValue={(val: string) =>
                      this.updateState('homeAddress', val)
                    }
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
                <FormContainerAtom headerText={'Customer pays me with'}>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: '#F3F3F3',
                      padding: 10
                    }}
                  >
                    <PickerAtom
                      list={['Naira (\u20A6)']}
                      placeholder="Select Currency"
                    />
                  </View>
                </FormContainerAtom>
                <FormContainerAtom>
                  <FormContainerWrappedAtom>
                    <InputAtom
                      label="Birthday"
                      getValue={val => this.updateState('birthday', val)}
                    />
                    <InputAtom
                      label="Marital Status"
                      getValue={val => this.updateState('maritalStatus', val)}
                    />
                    <InputAtom
                      label="Marriage Anniversary"
                      getValue={val => this.updateState('marriageAnn', val)}
                    />
                  </FormContainerWrappedAtom>
                </FormContainerAtom>
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
        </ScrollView>
        <SaveCancelButton
          navigation={this.props.navigation}
          createfunc={this.create}
          positiveButtonName="SAVE"
        />
      </View>
    );
  }
}

export default UpsertCustomerScreen;

const styles = StyleSheet.create({
  ababa: {
    flex: 1,
    backgroundColor: '#fff'
  },
  itemsContainer: {
    flex: 4,
    backgroundColor: '#F6F6F6'
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
  }
});
