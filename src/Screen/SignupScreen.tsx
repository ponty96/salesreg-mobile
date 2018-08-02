import React, { PureComponent } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'

import { Mutation } from 'react-apollo'
import TransitionAtom from '../Atom/TransitionAtom'
import AuthenticationHeader from '../Components/AuthenticationHeader'
import SecondSignUpForm from '../Components/SecondSignUpForm'
import SignupForm from '../Components/SignupForm'
import { RegisterCompanyMutationGQL } from '../graphql/mutations/authenticate'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

interface IState {
  showSecondScreen: boolean
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
}

class SignupScreen extends PureComponent<IProps, IState> {
  public state = {
    showSecondScreen: false,
    email: '',
    password: '',
    name: '',
    passwordConfirmation: '',
    gender: '',
    businessName: '',
    businessAddress: '',
    businessEmail: '',
    products: false,
    services: false,
    currency: ''
  }

  public onPress = () => {
    this.setState({ showSecondScreen: true })
  }

  public updateState = (key: string, val: any) => {
    const formData = { ...this.state, [key]: val }
    this.setState({ ...formData })
  }

  public handleSignUpForm = () => {
    this.setState({ showSecondScreen: true })
  }
  public render() {
    return (
      <View style={styles.container}>
        <AuthenticationHeader />
        <ScrollView>
          <View style={styles.wrapper}>
            <Text style={[styles.signUpText, { fontFamily: 'SourceSansPro' }]}>
              SIGN UP
            </Text>
            <TransitionAtom firstScreen={!this.state.showSecondScreen} />
            <Text
              style={[styles.personalInfoText, { fontFamily: 'SourceSansPro' }]}
            >
              {!this.state.showSecondScreen
                ? 'PERSONAL INFORMATION'
                : 'BUSINESS INFORMATION'}
            </Text>
            <Mutation
              mutation={RegisterCompanyMutationGQL}
              onCompleted={this.onCompleted}
            >
              {registerUser => (
                <KeyboardAvoidingView
                  behavior={'padding'}
                  keyboardVerticalOffset={95}
                >
                  {!this.state.showSecondScreen ? (
                    <SignupForm
                      onPress={this.handleSignUpForm}
                      email={this.state.email}
                      password={this.state.password}
                      passwordConfirmation={this.state.passwordConfirmation}
                      name={this.state.name}
                      gender={this.state.gender}
                      onUpdateState={this.updateState}
                    />
                  ) : (
                    <SecondSignUpForm
                      // tslint:disable-next-line:jsx-no-lambda
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
                    />
                  )}
                </KeyboardAvoidingView>
              )}
            </Mutation>
          </View>
        </ScrollView>
      </View>
    )
  }

  public parseMutationVariables = () => {
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

  public parseAddress = (): any => {
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

  public parseCategory = (products, services) => {
    if (products && services) {
      return 'PRODUCT_SERVICE'
    } else if (products) {
      return 'PRODUCT'
    } else if (services) {
      return 'SERVICE'
    }
    return 'PRODUCT_SERVICE'
  }

  public onCompleted = async data => {
    const { registerCompany } = data
    if (registerCompany.success) {
      Alert.alert(
        'Registration Success',
        'Verify your account via the link sent to your email',
        [
          { text: 'OK', onPress: () => this.props.navigation.navigate('Login') }
        ],
        { cancelable: false }
      )
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
