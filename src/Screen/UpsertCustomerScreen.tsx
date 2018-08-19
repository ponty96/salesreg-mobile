import React, { PureComponent } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import InputAtom from '../Atom/InputAtom';
import PickerAtom from '../Atom/PickerAtom';
import ButtonAtom from '../Atom/ButtonAtom';
import FormImageAtom from '../Atom/FormImageAtom';
import { Form } from 'native-base';
import { color } from '../Style/Color';
import FormContainerAtom from '../Atom/FormContainerAtom';
import SaveCancelButton from '../Container/SaveCancelButton';
import { ScrollView } from 'react-native-gesture-handler';
import CustomHeader from '../Components/CustomHeader';
import FormAddressSection from '../Components/FormAddressSection';
import { Textarea } from 'native-base';
import FormErrorTextAtom from '../Atom/FormErrorTextAtom';
import DatePickerAtom from '../Atom/DatePickerAtom';

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
    phone: '',
    name: '',
    email: '',
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
    likes: '',
    dislikes: '',
    street1: '',
    city: '',
    state: '',
    country: '',
    fieldErrors: null
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
    const { fieldErrors } = this.state;
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
                    label="Customer Name"
                    getValue={val => this.updateState('name', val)}
                    required
                    placeholder="e.g Ayomide Aregbede"
                    defaultValue={this.state.customerName}
                  />
                  <InputAtom
                    label={'Company Name'}
                    placeholder="e.g Miji Jones"
                    defaultValue={this.state.companyName}
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
                    required
                    placeholder="e.g 0813443412"
                    defaultValue={this.state.phone}
                  />
                  {/* <InputAtom
                    getValue={val => this.updateState('fax', val)}
                    keyboardType="numeric"
                    key="fax"
                    label="Fax"
                  /> */}
                  <InputAtom
                    getValue={val => this.updateState('email', val)}
                    keyboardType="email-address"
                    key="email"
                    label="Email Address"
                    placeholder="e.g somebody@example.com"
                    defaultValue={this.state.email}
                  />
                </FormContainerAtom>
                <FormContainerAtom headerText="Banking detail">
                  <InputAtom
                    label="Bank name"
                    getValue={val => this.updateState('bankName', val)}
                    placeholder="e.g Guarranty Trust Bank"
                    defaultValue={this.state.bankName}
                  />
                  <InputAtom
                    label="Account name"
                    getValue={val => this.updateState('accountName', val)}
                    placeholder="e.g Ayomide Aregbede"
                    defaultValue={this.state.accountName}
                  />
                  <InputAtom
                    label="Account number"
                    getValue={val => this.updateState('accountNumber', val)}
                    keyboardType="numeric"
                    placeholder="03457806203"
                    defaultValue={this.state.accountNumber}
                  />
                </FormContainerAtom>
                <FormAddressSection
                  street1={this.state.street1}
                  city={this.state.city}
                  state={this.state.state}
                  country={this.state.country}
                  fieldErrors={fieldErrors}
                  getValue={this.updateState}
                />
                <FormContainerAtom headerText={'Customer pays me with'}>
                  <PickerAtom
                    list={['Naira (\u20A6)']}
                    placeholder={`e.g Naira (\u20A6)`}
                    selected={this.state.currency.toUpperCase()}
                    handleSelection={val => this.updateState('currency', val)}
                    label="Currency"
                  />
                  {fieldErrors &&
                    fieldErrors['currency'] && (
                      <FormErrorTextAtom errorText={fieldErrors['currency']} />
                    )}
                </FormContainerAtom>
                <FormContainerAtom headerText="Other information">
                  <DatePickerAtom
                    placeholder=""
                    date={this.state.birthday}
                    handleDateSelection={val =>
                      this.updateState('birthday', val)
                    }
                    label="Birthday"
                    required={true}
                    error={fieldErrors && fieldErrors['birthday']}
                  />
                  <PickerAtom
                    list={['Single', 'Married']}
                    placeholder="e.g Single"
                    selected={this.state.maritalStatus.toUpperCase()}
                    handleSelection={val =>
                      this.updateState('maritalStatus', val)
                    }
                    label="Marital Status"
                  />
                  {fieldErrors &&
                    fieldErrors['maritalStatus'] && (
                      <FormErrorTextAtom
                        errorText={fieldErrors['maritalStatus']}
                      />
                    )}
                </FormContainerAtom>
                <FormContainerAtom headerText="Likes">
                  <Textarea
                    rowSpan={5}
                    placeholder="e.g hublot, movado, red, orange"
                    placeholderTextColor={color.inactive}
                    defaultValue={this.state.likes}
                    onChangeText={val => this.updateState('likes', val)}
                  />
                  {fieldErrors &&
                    fieldErrors['likes'] && (
                      <FormErrorTextAtom errorText={fieldErrors['likes']} />
                    )}
                  {/* <ButtonAtom
                    btnText="+ Add Like"
                    transparent={true}
                    onPress={this.addLike}
                    textStyle={styles.sendAnother}
                    btnStyle={styles.btnStyle}
                  /> */}
                </FormContainerAtom>
                <FormContainerAtom headerText="Dislikes">
                  <Textarea
                    rowSpan={5}
                    placeholder="e.g hublot, movado, red, orange"
                    placeholderTextColor={color.inactive}
                    defaultValue={this.state.likes}
                    onChangeText={val => this.updateState('dislikes', val)}
                  />
                  {fieldErrors &&
                    fieldErrors['dislikes'] && (
                      <FormErrorTextAtom errorText={fieldErrors['dislikes']} />
                    )}
                  {/* <ButtonAtom
                    btnText="+ Add Dislike"
                    transparent={true}
                    onPress={this.addDislike}
                    textStyle={styles.sendAnother}
                    btnStyle={styles.btnStyle}
                  /> */}
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
  },
  bottomBorder: {
    borderBottomColor: color.list,
    borderBottomWidth: 1,
    marginLeft: 3,
    marginRight: 3
  }
});
