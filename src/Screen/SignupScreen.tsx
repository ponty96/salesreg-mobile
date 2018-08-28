import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, Alert } from 'react-native'

import SignupForm from '../Components/SignupForm'
import SecondSignUpForm from '../Components/SecondSignUpForm'
import AuthenticationHeader from '../Components/AuthenticationHeader'
import TransitionAtom from '../Atom/TransitionAtom'
import { color } from '../Style/Color'
import { RegisterCompanyMutationGQL } from '../graphql/mutations/authenticate'
import { Mutation } from 'react-apollo'
import { parseFieldErrors, validateRegStep1FormInputs } from '../Functions'
import AppSpinner from '../Components/Spinner'
import { Container, Content, Form } from 'native-base'

interface IProps {
  navigation: any
}

interface IState {
  currentForm: number
  email: string
  password: string
  name: string
  passwordConfirmation: string
  gender: string
  businessName: string
  businessAddress: string
  businessEmail: string
  products: boolean
  services: boolean
  currency: string
  fieldErrors: any
}

class SignupScreen extends PureComponent<IProps, IState> {
  state = {
    email: '',
    name: '',
    password: '',
    passwordConfirmation: '',
    gender: '',
    businessName: '',
    businessAddress: '',
    businessEmail: '',
    products: false,
    services: false,
    currency: '',
    fieldErrors: null,
    currentForm: 0
  }

  next = () => {
    const errors = validateRegStep1FormInputs(this.state)
    console.log('ERORS ', errors)
    if (errors && Object.keys(errors).length > 0) {
      this.setState({ fieldErrors: errors })
    } else {
      this.setState({ currentForm: 1 })
    }
  }

  updateState = (key: string, val: any) => {
    const formData = { ...this.state, [key]: val }
    this.setState({ ...formData })
  }

  handleSignUpForm = () => {
    // this.setState({ currentForm: true });
  }
  render() {
    return (
      <Container>
        <AuthenticationHeader />
        <Content>
          <View style={styles.wrapper}>
            <Text
              style={[styles.signUpText, { fontFamily: 'Source Sans Pro' }]}
            >
              SIGN UP
            </Text>
            <TransitionAtom
              firstScreen={this.state.currentForm == 0 ? true : false}
            />
            <Text
              style={[
                styles.personalInfoText,
                { fontFamily: 'Source Sans Pro' }
              ]}
            >
              {this.state.currentForm == 0
                ? 'PERSONAL INFORMATION'
                : 'BUSINESS INFORMATION'}
            </Text>
            <Mutation
              mutation={RegisterCompanyMutationGQL}
              onCompleted={this.onCompleted}
            >
              {(registerUser, { loading }) => (
                <Form>
                  <AppSpinner visible={loading} />
                  {this.state.currentForm == 0 ? (
                    <SignupForm
                      email={this.state.email}
                      password={this.state.password}
                      passwordConfirmation={this.state.passwordConfirmation}
                      name={this.state.name}
                      gender={this.state.gender}
                      onUpdateState={this.updateState}
                      fieldErrors={this.state.fieldErrors}
                      onNext={this.next}
                      onBack={() => this.props.navigation.navigate('Login')}
                      navigation={this.props.navigation}
                    />
                  ) : (
                    <SecondSignUpForm
                      onSubmit={() =>
                        registerUser({
                          variables: this.parseMutationVariables()
                        })
                      }
                      onUpdateState={this.updateState}
                      businessName={this.state.businessName}
                      businessAddress={this.state.businessAddress}
                      businessEmail={this.state.businessEmail}
                      products={this.state.products}
                      services={this.state.services}
                      currency={this.state.currency}
                      navigation={this.props.navigation}
                      fieldErrors={this.state.fieldErrors}
                    />
                  )}
                </Form>
              )}
            </Mutation>
          </View>
        </Content>
      </Container>
    )
  }

  parseMutationVariables = () => {
    const {
      email,
      password,
      name,
      passwordConfirmation,
      gender,
      businessName,
      businessEmail,
      products,
      services,
      currency
    } = this.state
    return {
      firstName: name ? name.split(' ')[0] : '',
      lastName: name ? name.split(' ')[1] : '',
      password,
      passwordConfirmation,
      email,
      gender,
      title: businessName,
      contactEmail: businessEmail,
      currency,
      category: this.parseCategory(products, services),
      ...this.parseAddress()
    }
  }

  parseAddress = (): any => {
    /**
     * This is for now a dummy component that uses an address placeholder until we can add google maps address
     */
    return {
      street1: '34 Oba Adesida Road',
      city: 'Akure',
      state: 'Ondo',
      country: 'Nigeria'
    }
  }

  parseCategory = (products, services) => {
    if (products && services) {
      return 'PRODUCT_SERVICE'
    } else if (products) {
      return 'PRODUCT'
    } else if (services) {
      return 'SERVICE'
    }
    return 'PRODUCT_SERVICE'
  }

  onCompleted = async data => {
    console.log('SignupScreen', data)
    const {
      registerCompany: { success, fieldErrors }
    } = data
    if (success) {
      Alert.alert(
        'Registration Success',
        'Verify your account via the link sent to your email',
        [
          { text: 'OK', onPress: () => this.props.navigation.navigate('Login') }
        ],
        { cancelable: false }
      )
    } else {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    }
  }
}

export default SignupScreen

const styles = StyleSheet.create({
  personalInfoText: {
    marginTop: 10,
    color: color.button,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 5
  },
  wrapper: {
    paddingHorizontal: 32
  },
  signUpText: {
    color: color.button,
    marginTop: 30,
    marginBottom: 30,
    alignSelf: 'center',
    fontSize: 16
  },
  container: {
    flex: 1,
    backgroundColor: color.secondary
  }
})
