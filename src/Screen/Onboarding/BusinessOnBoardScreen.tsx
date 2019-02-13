import React from 'react'
import ThirdStep from '../../Components/SignUp/ThirdStep'
import LastStep from '../../Components/SignUp/LastStep'
import FormStepperContainer from '../../Container/Form/StepperContainer'
import {
  Countries,
  Currencies,
  geCurrencyFromCountry
} from '../../utilities/data/picker-lists'
import Auth from '../../services/auth'
import { AddUserCompanyMutationGQL } from '../../graphql/mutations/authenticate'
import { Mutation } from 'react-apollo'
import { parseFieldErrors } from '../../Functions'
import AppSpinner from '../../Components/Spinner'
import { AuthenticateClientGQL } from '../../graphql/client-mutations/authenticate'
import { UserContext } from '../../context/UserContext'
import setAppAnalytics from '../../Functions/setAppAnalytics'

interface IProps {
  navigation: any
  screenProps: any
  resetUserContext: (user) => void
  user: any
  resetGettingStartedProgress: (gettingStarted: any) => void
}

interface IState {
  currentStep: number
  title: string
  contactEmail: string
  businessPhone: string
  businessCountry: string
  currency: string
  slug: string
  description: string
  logo: string
  user: any
  fieldErrors: any
}

class BusinessOnboardScreen extends React.PureComponent<IProps, IState> {
  state = {
    currentStep: 0,
    user: null,
    title: '',
    contactEmail: '',
    businessPhone: '',
    businessCountry: 'NG',
    currency: 'NGN',
    slug: '',
    description: '',
    logo: '',
    fieldErrors: null
  }

  async componentWillMount() {
    this.setState({
      user: this.props.user
    })
  }

  updateState = (key: string, val: any) => {
    let formData = { ...this.state, [key]: val }
    if (key == 'businessCountry') {
      formData = { ...formData, currency: geCurrencyFromCountry(val) }
    }
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
    const { user, slug } = this.state
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
            handleNonFormErrors={() => {
              Auth.clearVault()
              this.props.navigation.navigate('OnBoarding')
            }}
            steps={[
              {
                stepTitle: 'Tell us about your business',
                formFields: [
                  {
                    label: 'What is your official business name?',
                    placeholder: 'E.g Lidstack',
                    underneathText: `This name will appear on your webstore,\nheader, invoice, receipts, and notifications \nsent to your customers.`,
                    type: {
                      type: 'input',
                      keyboardType: 'default'
                    },
                    validators: ['required'],
                    name: 'title'
                  },
                  {
                    label: 'How should customers call you?',
                    placeholder: 'E.g StacknBit',
                    underneathText: `This is your business nick name. Please make sure that its in lowercase and avoid adding spacing. Only Alphanumerics are allowed also`,
                    type: {
                      type: 'input',
                      keyboardType: 'default'
                    },
                    validators: ['required'],
                    name: 'slug'
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
                      'Your logo will appear on your webstore,\n invoice and receipts headers. If you have no \nlogo, your business name only, be used.'
                  }
                ]
              },
              {
                stepTitle: `How can customers contact you?`,
                formFields: [
                  {
                    label: 'What country are you in?',
                    placeholder: 'Touch to choose',
                    type: {
                      type: 'picker',
                      options: Countries
                    },
                    validators: ['required'],
                    name: 'businessCountry'
                  },
                  {
                    label: 'What about your phone number?',
                    type: {
                      type: 'phone-input'
                    },
                    validators: ['required', 'phone'],
                    name: 'businessPhone',
                    extraData: {
                      countryCode: this.state['businessCountry']
                    }
                  },
                  {
                    label: 'Your business email',
                    placeholder: `E.g ${user ? user.firstName.trim() : ''}@${
                      slug.length > 0 ? slug.replace(/\s/g, '') : 'myDomain'
                    }.com`,
                    type: {
                      type: 'input',
                      options: ['male', 'female'],
                      keyboardType: 'email-address'
                    },
                    validators: ['required', 'email'],
                    name: 'contactEmail'
                  }
                ]
              },
              {
                stepTitle: `Finally, what about your transactions?`,
                formFields: [
                  {
                    label: 'What currency do you transact in?',
                    placeholder: 'Touch to choose',
                    type: {
                      type: 'picker',
                      disabled: true,
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
            businessName={this.state.title}
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
    params.slug = this.state.slug.replace(/\s/g, '').toLowerCase()
    delete params.businessCountry
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
      setAppAnalytics('REGISTER_ACCOUNT', this.state)
      const { user } = this.props
      await Auth.setCurrentUser({ ...user, company: data })
      await Auth.setGettingStartedProgress('1')

      this.props.resetGettingStartedProgress('1')
      this.props.resetUserContext({ ...user, company: data })
      this.navigateToStep(3)
    }
  }

  navigateToDashboard = async () => {
    const {
      screenProps: { client }
    } = this.props
    const { user } = this.props
    await client.resetStore()
    client.mutate({
      mutation: AuthenticateClientGQL,
      variables: { user: user }
    })
  }
}

const _BusinessOnboardScreen = props => (
  <UserContext.Consumer>
    {({ user, resetUserContext, resetGettingStartedProgress }) => (
      <BusinessOnboardScreen
        {...props}
        user={user}
        resetUserContext={resetUserContext}
        resetGettingStartedProgress={resetGettingStartedProgress}
      />
    )}
  </UserContext.Consumer>
)

export default _BusinessOnboardScreen
