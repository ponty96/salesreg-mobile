import React, { PureComponent } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import InputAtom from '../Atom/InputAtom';
import PickerAtom from '../Atom/PickerAtom';
// import ButtonAtom from '../Atom/ButtonAtom';
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
import { Mutation } from 'react-apollo';
import { UpsertContactGQL } from '../graphql/mutations/contact';
import AppSpinner from '../Components/Spinner';
import Auth from '../services/auth';
import { parseFieldErrors } from '../Functions';

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
    image: 'http://downloadicons.net/sites/default/files/user-icon-2197.png',
    contactName: '',
    companyName: '',
    number: '',
    name: '',
    email: '',
    fax: '',
    bankName: '',
    accountName: '',
    accountNumber: '',
    currency: '',
    birthday: '',
    maritalStatus: '',
    marriageAnniversary: '',
    likes: '',
    dislikes: '',
    street1: '',
    city: '',
    state: '',
    country: '',
    fieldErrors: null,
    userId: '',
    companyId: ''
  };

  componentDidMount() {
    const customer = this.props.navigation.getParam('customer');
    console.log('customer', customer);
    let details = {};
    if (customer) {
      const {
        address = {},
        bank = {},
        likes = [],
        dislikes = [],
        phone
      } = customer;
      details = {
        ...customer,
        ...address,
        ...bank,
        ...phone,
        likes: likes.join(', '),
        dislikes: dislikes.join(', ')
      };
    }
    this.updateDetails(details);
  }

  updateDetails = async (details: any) => {
    const user = JSON.parse(await Auth.getCurrentUser());
    this.setState({
      userId: user.id,
      companyId: user.company.id,
      ...details
    });
  };

  updateState = (key: string, value: any) => {
    this.setState({ [key]: value });
  };

  getImage = (_pic: any) => {};

  // addFromContacts = () => {
  //   console.log('Added From Contacts');
  // };

  render() {
    const { fieldErrors } = this.state;
    return (
      <Mutation mutation={UpsertContactGQL} onCompleted={this.onCompleted}>
        {(upsertCustomer, { loading }) => (
          <View style={styles.ababa}>
            <ScrollView>
              <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={60}
                style={styles.itemsContainer}
              >
                <AppSpinner visible={loading} />
                <ScrollView>
                  <Form>
                    <FormImageAtom
                      form={'customer'}
                      getValue={this.getImage}
                      source={this.state.image}
                    />
                    <FormContainerAtom headerText={'Customer ID'}>
                      <InputAtom
                        label="Customer Name"
                        getValue={val => this.updateState('contactName', val)}
                        required
                        placeholder="e.g Ayomide Aregbede"
                        defaultValue={this.state.contactName}
                        error={fieldErrors && fieldErrors['contactName']}
                      />
                      <InputAtom
                        label={'Company Name'}
                        placeholder="e.g Miji Jones"
                        defaultValue={this.state.companyName}
                        getValue={val => this.updateState('companyName', val)}
                        error={fieldErrors && fieldErrors['companyName']}
                      />
                    </FormContainerAtom>
                    <FormContainerAtom headerText={'Customer contact'}>
                      <InputAtom
                        getValue={val => this.updateState('number', val)}
                        keyboardType="numeric"
                        key="number"
                        label="Phone"
                        required
                        placeholder="e.g 0813443412"
                        defaultValue={this.state.number}
                        error={fieldErrors && fieldErrors['number']}
                      />
                      <InputAtom
                        getValue={val => this.updateState('email', val)}
                        keyboardType="email-address"
                        key="email"
                        label="Email Address"
                        placeholder="e.g somebody@example.com"
                        defaultValue={this.state.email}
                        error={fieldErrors && fieldErrors['email']}
                      />
                    </FormContainerAtom>
                    <FormContainerAtom headerText="Banking detail">
                      <InputAtom
                        label="Bank name"
                        getValue={val => this.updateState('bankName', val)}
                        placeholder="e.g Guarranty Trust Bank"
                        defaultValue={this.state.bankName}
                        error={fieldErrors && fieldErrors['bankName']}
                      />
                      <InputAtom
                        label="Account name"
                        getValue={val => this.updateState('accountName', val)}
                        placeholder="e.g Ayomide Aregbede"
                        defaultValue={this.state.accountName}
                        error={fieldErrors && fieldErrors['accountName']}
                      />
                      <InputAtom
                        label="Account number"
                        getValue={val => this.updateState('accountNumber', val)}
                        keyboardType="numeric"
                        placeholder="03457806203"
                        defaultValue={this.state.accountNumber}
                        error={fieldErrors && fieldErrors['accountNumber']}
                      />

                      <PickerAtom
                        list={['Naira (\u20A6)']}
                        placeholder={`e.g Naira (\u20A6)`}
                        selected={this.state.currency}
                        handleSelection={val =>
                          this.updateState('currency', val)
                        }
                        label="Currency"
                      />
                      {fieldErrors &&
                        fieldErrors['currency'] && (
                          <FormErrorTextAtom
                            errorText={fieldErrors['currency']}
                          />
                        )}
                    </FormContainerAtom>
                    <FormAddressSection
                      street1={this.state.street1}
                      city={this.state.city}
                      state={this.state.state}
                      country={this.state.country}
                      fieldErrors={fieldErrors}
                      getValue={this.updateState}
                    />
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
                          <FormErrorTextAtom
                            errorText={fieldErrors['dislikes']}
                          />
                        )}
                    </FormContainerAtom>
                  </Form>
                </ScrollView>
              </KeyboardAvoidingView>
            </ScrollView>
            <SaveCancelButton
              navigation={this.props.navigation}
              createfunc={() =>
                upsertCustomer({ variables: this.parseMutationVariables() })
              }
              positiveButtonName="SAVE"
            />
          </View>
        )}
      </Mutation>
    );
  }
  parseMutationVariables = () => {
    const customer = this.props.navigation.getParam('customer', {});
    return {
      ...this.state,
      contactId: customer ? customer.id : null,
      bank: this.parseBankDetails(),
      type: 'customer'
    };
  };

  parseBankDetails = (): any => {
    const { accountName, accountNumber, bankName } = this.state;
    if (accountName || accountNumber || bankName) {
      return {
        accountName,
        accountNumber,
        bankName
      };
    }
    return null;
  };
  onCompleted = async res => {
    const {
      upsertContact: { success, fieldErrors }
    } = res;
    if (success) {
      this.props.navigation.navigate('Customers');
    } else {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) });
    }
  };
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
