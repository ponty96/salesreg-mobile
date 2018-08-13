import React, { PureComponent } from 'react';
import { Form, CheckBox } from 'native-base';
import { View, Text, StyleSheet } from 'react-native';
import InputAtom from '../Atom/InputAtom';
import ButtonAtom from '../Atom/ButtonAtom';
import { color } from '../Style/Color';
import PickerAtom from '../Atom/PickerAtom';
import FormErrorTextAtom from '../Atom/FormErrorTextAtom';

interface IProps {
  navigation: any;
  onSubmit: () => void;
  onUpdateState?: (key: string, val: any) => void;
  businessName: string;
  businessAddress?: string;
  businessEmail: string;
  products: boolean;
  services: boolean;
  currency: string;
  fieldErrors: any;
}

interface IState {}

class SecondSigupForm extends PureComponent<IProps, IState> {
  flipCheckedState = (oldState: boolean, key: string) => {
    if (key === 'products') this.props.onUpdateState('products', !oldState);
    else this.props.onUpdateState('services', !oldState);
  };

  render() {
    const { fieldErrors } = this.props;
    return (
      <Form style={styles.resetFormContainer}>
        <InputAtom
          label="Business name"
          defaultValue={this.props.businessName}
          getValue={name => this.props.onUpdateState('businessName', name)}
          contStyle={styles.marginlessInput}
          required={true}
          error={fieldErrors && fieldErrors['title']}
          placeholder="Enter the Name of your Business"
        />

        <InputAtom
          label="Business Email"
          defaultValue={this.props.businessEmail}
          getValue={businessEmail =>
            this.props.onUpdateState('businessEmail', businessEmail)
          }
          keyboardType="email-address"
          contStyle={styles.marginlessInput}
          required={true}
          error={fieldErrors && fieldErrors['contactEmail']}
          placeholder="Enter your Business email"
        />

        <Text style={[styles.whatYouSell, { fontFamily: 'SourceSansPro' }]}>
          *What are you selling?
        </Text>
        <View style={styles.checkBoxWrapper}>
          <CheckBox
            checked={this.props.products}
            onPress={() => {
              this.flipCheckedState(this.props.products, 'products');
            }}
            color={color.inactive}
            style={styles.checkBox}
          />
          <Text style={[styles.checkBoxText, { fontFamily: 'SourceSansPro' }]}>
            Products(Traders, manufacturers, producers)
          </Text>
        </View>

        <View style={styles.checkBoxWrapper}>
          <CheckBox
            checked={this.props.services}
            onPress={() => {
              this.flipCheckedState(this.props.services, 'services');
            }}
            color={color.inactive}
            style={styles.checkBox}
          />
          <Text style={[styles.checkBoxText, { fontFamily: 'SourceSansPro' }]}>
            Services(Service providers)
          </Text>
        </View>

        <Text style={[styles.whatYouSell, { fontFamily: 'SourceSansPro' }]}>
          Transaction currency
        </Text>
        <View style={styles.pickerWrapper}>
          <PickerAtom
            list={['Naira(\u20A6)']}
            placeholder={`Naira(\u20A6)`}
            selected={this.props.currency}
            handleSelection={currency =>
              this.props.onUpdateState('currency', currency)
            }
          />
        </View>

        {fieldErrors &&
          fieldErrors['currency'] && (
            <FormErrorTextAtom errorText={fieldErrors['currency']} />
          )}
        <View style={styles.buttonsWrapper}>
          <ButtonAtom
            btnText="SIGN UP"
            onPress={this.props.onSubmit}
            btnStyle={styles.longButton}
            textStyle={[
              styles.signUp,
              { fontFamily: 'SourceSansPro_Semibold' }
            ]}
          />
          <Text style={[styles.termsText, { fontFamily: 'SourceSansPro' }]}>
            Signing up means you agree with our{' '}
            <Text style={[styles.redTermText, { fontFamily: 'SourceSansPro' }]}>
              Terms
            </Text>{' '}
            &{' '}
            <Text style={[styles.redTermText, { fontFamily: 'SourceSansPro' }]}>
              Privacy policy
            </Text>
          </Text>
          <Text style={[styles.haveAccount, { fontFamily: 'SourceSansPro' }]}>
            Or you have an account?
          </Text>
          <ButtonAtom
            btnText="LOGIN"
            transparent={true}
            onPress={() => this.props.navigation.navigate('Login')}
            textStyle={[styles.login, { fontFamily: 'SourceSansPro_Semibold' }]}
            btnStyle={styles.loginButton}
          />
        </View>
      </Form>
    );
  }
}

export default SecondSigupForm;

const styles = StyleSheet.create({
  marginlessInput: {
    marginLeft: 0,
    marginTop: 5
  },
  btnColor: {
    color: color.button
  },
  buttonsWrapper: {
    marginTop: 16
  },
  whatYouSell: {
    marginTop: 28,
    color: color.button,
    fontSize: 14
  },
  checkBoxWrapper: {
    flexDirection: 'row',
    marginTop: 16
  },
  checkBox: {
    left: 0,
    borderWidth: 1,
    paddingBottom: 0
  },
  checkBoxText: {
    marginLeft: 10,
    fontSize: 14,
    color: color.principal
  },
  pickerWrapper: {
    opacity: 0.5,
    width: '60%',
    marginBottom: 16
  },
  placeholderColor: {
    color: color.inactive
  },
  longButton: {
    alignSelf: 'stretch',
    paddingHorizontal: 0,
    justifyContent: 'center',
    height: 50
  },
  termsText: {
    color: color.principal,
    textAlign: 'center',
    fontSize: 12
  },
  redTermText: {
    color: color.button
  },
  haveAccount: {
    marginTop: 16,
    textAlign: 'center',
    color: color.principal,
    fontSize: 14
  },
  resetFormContainer: {
    marginTop: 16
  },
  login: {
    color: color.button,
    fontSize: 16
  },
  signUp: {
    fontSize: 16
  },
  loginButton: {
    marginVertical: 0
  }
});
