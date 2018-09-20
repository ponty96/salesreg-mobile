import React from 'react'
import ThirdStep from '../../Components/SignUp/ThirdStep'
import LastStep from '../../Components/SignUp/LastStep'
import FormStepperContainer from '../../Container/Form/StepperContainer'
import { Countries, Currencies } from '../../utilities/data/picker-lists'
import Auth from '../../services/auth'
import { AddUserCompanyMutationGQL } from '../../graphql/mutations/authenticate'
import { Mutation } from 'react-apollo'
import { parseFieldErrors } from '../../Functions'
import AppSpinner from '../../Components/Spinner'
import { AuthenticateClientGQL } from '../../graphql/client-mutations/authenticate'

interface IProps {
  navigation: any
  screenProps: any
}

interface IState {
  currentStep: number
  title: string
  contactEmail: string
  businessPhone: string
  businessCountry: string
  currency: string
  description: string
  logo: string[]
  user: any
  fieldErrors: any
}

export default class BusinessOnboardScreen extends React.PureComponent<
  IProps,
  IState
> {
  state = {
    currentStep: 0,
    user: null,
    title: '',
    contactEmail: '',
    businessPhone: '',
    businessCountry: '',
    currency: '',
    description: '',
    logo: [],
    fieldErrors: null
  }

  async componentWillMount() {
    const user = JSON.parse(await Auth.getCurrentUser())
    this.setState({
      user: user
    })
  }

  updateState = (key: string, val: any) => {
    const formData = { ...this.state, [key]: val }
    this.setState({ ...formData })
  }

  render() {
    return (
      <Mutation
        mutation={AddUserCompanyMutationGQL}
        onCompleted={this.onCompleted}
      >
        {(addUserCompany, { loading }) => [
          <AppSpinner visible={loading} />,
          this.renderComponentAtStep(addUserCompany)
        ]}
      </Mutation>
    )
  }

  navigateToStep = step => {
    this.setState({ currentStep: step })
  }

  renderComponentAtStep = (callbackFunc): JSX.Element => {
    const { user } = this.state
    const { currentStep } = this.state
    switch (currentStep) {
      case 0:
      default:
        return (
          <ThirdStep
            onCtaPress={() => this.navigateToStep(1)}
            firstName={user ? user.firstName : ''}
          />
        )
      case 1:
        return (
          <FormStepperContainer
            formData={this.state}
            steps={[
              {
                stepTitle: 'Tell us about your business',
                formFields: [
                  {
                    label: 'Whats your business name?',
                    placeholder: 'E.g Lidstack',
                    underneathText: `This name will appear on your webstore,\nheader, invoice, receipts, and notifications \nsent to your customers.`,
                    type: {
                      type: 'input',
                      keyboardType: 'default'
                    },
                    name: 'title'
                  },
                  {
                    label: 'Any nice description of your business?',
                    placeholder: 'E.g Write something nice',
                    underneathText: `Your business description will be displayed in\nthe ABOUT section of your Webstore, so your \nsite visitors can appreciate what you do.`,
                    type: {
                      type: 'input',
                      keyboardType: 'default',
                      multiline: true
                    },
                    name: 'description'
                  }
                ]
              },
              {
                stepTitle: 'Now your logo(optional).\n1MB or less',
                formFields: [
                  {
                    label: '',
                    name: 'logo',
                    type: {
                      type: 'image-upload'
                    },
                    underneathText:
                      'Your logo will appear on your webstore,\n invoice and receipts headers. If you have no \nlogo, your business name will only be used'
                  }
                ]
              },
              {
                stepTitle: `How can customers contact you`,
                formFields: [
                  {
                    label: 'What country are you in?',
                    placeholder: 'Touch to choose',
                    type: {
                      type: 'picker',
                      options: Countries
                    },
                    name: 'businessCountry'
                  },
                  {
                    label: 'Whats about your phone number?',
                    type: {
                      type: 'phone-input'
                    },
                    name: 'businessPhone',
                    extraData: {
                      countryCode: this.state['businessCountry']
                    }
                  },
                  {
                    label: 'Your business email',
                    placeholder: `E.g ${user ? user.firstName : ''}@${
                      this.state['title']
                    }.com`,
                    type: {
                      type: 'input',
                      options: ['male', 'female'],
                      keyboardType: 'email-address'
                    },
                    name: 'contactEmail'
                  }
                ]
              },
              {
                stepTitle: `Finally, lets make sure no one accesses your account without your permission`,
                formFields: [
                  {
                    label: 'What currency do you transact in?',
                    placeholder: 'Touch to choose',
                    type: {
                      type: 'picker',
                      options: Currencies
                    },
                    name: 'currency'
                  }
                ],
                buttonTitle: 'Sign Up'
              }
            ]}
            updateValueChange={this.updateState}
            onCompleteSteps={() =>
              callbackFunc({
                variables: this.parseMutationVariables()
              })
            }
            handleBackPress={() => this.navigateToStep(0)}
            fieldErrors={this.state.fieldErrors}
          />
        )
      case 3:
        return (
          <LastStep
            onCtaPress={() => this.navigateToDashboard()}
            businessName="MayAfriq"
          />
        )
    }
  }
  parseMutationVariables = () => {
    let params = { ...this.state }
    delete params.currentStep
    delete params.fieldErrors
    params['phone'] = {
      number: params.businessPhone
    }
    delete params.businessPhone
    params['headOffice'] = {
      street1: '**',
      city: '**',
      state: '**',
      country: params.businessCountry
    }
    params.logo = this.state.logo.length > 0 ? this.state.logo[0] : null
    delete params.businessCountry
    params['category'] = 'PRODUCT_SERVICE'
    delete params.user
    return { company: params, userId: this.state.user.id }
  }
  onCompleted = async res => {
    const {
      addUserCompany: { success, fieldErrors, data }
    } = res
    if (!success) {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    } else {
      const user = JSON.parse(await Auth.getCurrentUser())
      await Auth.setCurrentUser({ ...user, company: data })
      this.navigateToStep(3)
    }
  }

  navigateToDashboard = async () => {
    const {
      screenProps: { client }
    } = this.props
    const user = JSON.parse(await Auth.getCurrentUser())
    await client.resetStore()
    client.mutate({
      mutation: AuthenticateClientGQL,
      variables: { user: user }
    })
  }
}
