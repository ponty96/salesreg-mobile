import React, { PureComponent } from 'react'
import { Alert } from 'react-native'
import { RegisterCompanyMutationGQL } from '../graphql/mutations/authenticate'
import { Mutation } from 'react-apollo'
import { parseFieldErrors } from '../Functions'
// import AppSpinner from '../Components/Spinner'
import SignUpProcessContainer from '../Container/SignUpProcessContainer'

interface IProps {
  navigation: any
}

interface IState {
  email: string
  password: string
  firstName: string
  lastName: string
  passwordConfirmation: string
  gender: string
  businessName: string
  businessAddress: string
  businessEmail: string
  businessPhone: string
  businessCountry: string
  currency: string
  description: string
  fieldErrors: any
}

class SignupScreen extends PureComponent<IProps, IState> {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirmation: '',
    gender: '',
    businessName: '',
    businessAddress: '',
    businessEmail: '',
    businessPhone: '',
    businessCountry: '',
    currency: '',
    description: '',
    fieldErrors: null
  }

  updateState = (key: string, val: any) => {
    const formData = { ...this.state, [key]: val }
    this.setState({ ...formData })
  }
  render() {
    return (
      <Mutation
        mutation={RegisterCompanyMutationGQL}
        onCompleted={this.onCompleted}
      >
        {registerUser => (
          <SignUpProcessContainer
            formData={this.state}
            updateValueChange={this.updateState}
            registerUser={() =>
              registerUser({
                variables: this.parseMutationVariables()
              })
            }
          />
        )}
      </Mutation>
    )
  }

  parseMutationVariables = () => {
    const {
      email,
      password,
      passwordConfirmation,
      gender,
      businessName,
      businessEmail,
      currency,
      firstName,
      lastName
    } = this.state
    return {
      firstName,
      lastName,
      password,
      passwordConfirmation,
      email,
      gender,
      title: businessName,
      contactEmail: businessEmail,
      currency,
      category: 'PRODUCT_SERVICE',
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
