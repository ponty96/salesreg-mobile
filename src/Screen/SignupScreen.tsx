import React, { PureComponent } from 'react'
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
  businessEmail: string
  businessPhone: string
  businessCountry: string
  currency: string
  description: string
  logo: string[]
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
    businessEmail: '',
    businessPhone: '',
    businessCountry: '',
    currency: '',
    description: '',
    logo: [],
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
        {(registerUser, { data }) => (
          <SignUpProcessContainer
            formData={this.state}
            updateValueChange={this.updateState}
            success={data ? data.registerCompany.success : false}
            fieldErrors={this.state.fieldErrors}
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
      street1: '***',
      city: '***',
      state: '**',
      country: this.state.businessCountry
    }
  }

  onCompleted = async data => {
    console.log('SignupScreen', data)
    const {
      registerCompany: { success, fieldErrors }
    } = data
    if (!success) {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    }
  }
}

export default SignupScreen
