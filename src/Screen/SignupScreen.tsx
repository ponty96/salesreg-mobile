import React, { PureComponent } from 'react'
import { Alert } from 'react-native'
import { RegisterCompanyMutationGQL } from '../graphql/mutations/authenticate'
import { Mutation } from 'react-apollo'
import { parseFieldErrors, validateRegStep1FormInputs } from '../Functions'
// import AppSpinner from '../Components/Spinner'
import SignUpProcessContainer from '../Container/SignUpProcessContainer'

interface IProps {
  navigation: any
}

interface IState {
  currentForm: number
  email: string
  password: string
  firstName: string
  lastName: string
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
    firstName: '',
    lastName: '',
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
      <Mutation
        mutation={RegisterCompanyMutationGQL}
        onCompleted={this.onCompleted}
      >
        {registerUser => (
          <SignUpProcessContainer
            formData={this.state}
            firstName={this.state.firstName}
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
      products,
      services,
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
