import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { parseFieldErrors } from '../Functions'
import {
  Countries,
  Currencies,
  geCurrencyFromCountry
} from '../utilities/data/picker-lists'
import AppSpinner from '../Components/Spinner'
import { UpdateCompanyGQL } from '../graphql/mutations/business'
import Auth from '../services/auth'
import FormStepperContainer from '../Container/Form/StepperContainer'
import { NavigationActions } from 'react-navigation'
import { NotificationContext } from '../context/NotificationContext'
import configureNotificationBanner from '../Functions/configureNotificationBanner'

interface IProps {
  navigation: any
  setNotificationBanner: (obj: any) => void
}

interface IState {
  logo: any
  about: string
  title: string
  contactEmail: string
  currency: string
  fieldErrors: any
  companyId: string
  street1: string
  facebook: string
  instagram: string
  linkedin: string
  twitter: string
  city: string
  slug: string
  state: string
  country: string
  phoneNumber: string
}

class EditBusinessProfileScreen extends Component<IProps, IState> {
  state = {
    logo: '',
    about: '',
    title: '',
    contactEmail: '',
    currency: 'NGN',
    street1: '',
    city: '',
    state: '',
    slug: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    twitter: '',
    country: 'NG',
    companyId: '',
    phoneNumber: '',
    fieldErrors: null
  }

  componentDidMount() {
    this.updateDetails()
  }

  parseAddressForForm = ({ branches }) => {
    const {
      location: { city, state, street1, country }
    } = branches.find(branch => branch.type == 'head_office')
    return { city, state, street1, country }
  }

  updateDetails = async () => {
    const user = JSON.parse(await Auth.getCurrentUser())
    this.setState({
      companyId: user.company.id,
      title: user.company.title,
      contactEmail: user.company.contactEmail,
      about: user.company.about,
      facebook: user.company.facebook || '',
      instagram: user.company.instagram || '',
      linkedin: user.company.linkedIn || '',
      twitter: user.company.twitter || '',
      slug: user.company.slug,
      currency: 'NGN',
      ...this.parseAddressForForm(user.company),
      phoneNumber: user.company.phone ? user.company.phone.number : '',
      country: 'NG'
    })
  }

  updateState = (key: string, val: any) => {
    let formData = { ...this.state, [key]: val }
    if (key == 'country') {
      formData = { ...formData, currency: geCurrencyFromCountry(val) }
    }
    this.setState({ ...formData })
  }

  render() {
    return (
      <Mutation mutation={UpdateCompanyGQL} onCompleted={this.onCompleted}>
        {(updateCompany, { loading }) => [
          <AppSpinner visible={loading} key="3344-ar%^&" />,
          <FormStepperContainer
            key="&&*44-ar%^&"
            formAction="update"
            formData={this.state}
            steps={[
              {
                stepTitle: 'Tell us about your business',
                formFields: [
                  {
                    label: 'What is your official business name?',
                    placeholder: 'E.g Lidstack',
                    validators: ['required'],
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
                    name: 'about'
                  }
                ]
              },
              {
                stepTitle: `What's your business address?`,
                formFields: [
                  {
                    label: 'What street is your business located at?',
                    placeholder: 'e.g 431 Road, D Close',
                    type: {
                      type: 'input'
                    },
                    validators: ['required'],
                    name: 'street1'
                  },
                  {
                    label: 'What city is your business in?',
                    placeholder: 'e.g Festac Town',
                    type: {
                      type: 'input'
                    },
                    validators: ['required'],
                    name: 'city'
                  },
                  {
                    label: 'What state is your business in?',
                    placeholder: 'e.g Lagos',
                    type: {
                      type: 'input'
                    },
                    validators: ['required'],
                    name: 'state'
                  },
                  {
                    label: 'What country is your business in?',
                    placeholder: 'Touch to choose',
                    type: {
                      type: 'picker',
                      options: Countries
                    },
                    validators: ['required'],
                    name: 'country'
                  }
                ]
              },
              {
                stepTitle: 'How can customers contact you?',
                formFields: [
                  {
                    label: 'What about your phone number?',
                    type: {
                      type: 'phone-input'
                    },
                    name: 'phoneNumber',
                    validators: ['required', 'phone'],
                    extraData: {
                      countryCode: this.state['country']
                    }
                  },
                  {
                    label: 'Your business email',
                    placeholder: `E.g ${this.state.contactEmail}`,
                    type: {
                      type: 'input',
                      keyboardType: 'email-address'
                    },
                    validators: ['required', 'email'],
                    name: 'contactEmail'
                  },
                  {
                    label: 'Facebook',
                    placeholder: 'e.g @username',
                    type: {
                      type: 'input'
                    },
                    name: 'facebook'
                  },
                  {
                    label: 'Instagram',
                    placeholder: 'e.g @username',
                    type: {
                      type: 'input'
                    },
                    name: 'instagram'
                  },
                  {
                    label: 'Twitter',
                    placeholder: 'e.g @username',
                    type: {
                      type: 'input'
                    },
                    name: 'twitter'
                  },
                  {
                    label: 'LinkedIn',
                    placeholder: 'e.g @username',
                    type: {
                      type: 'input'
                    },
                    name: 'linkedin'
                  }
                ]
              },
              {
                stepTitle: 'Now your logo(optional).\n3MB or less',
                formFields: [
                  {
                    label: '',
                    name: 'logo',
                    type: {
                      type: 'image-upload'
                    },
                    underneathText:
                      'Your logo will appear on your webstore,\n invoice and receipts headers. If you have no \nlogo, your business name only, will be used.'
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
                buttonTitle: 'Update'
              }
            ]}
            updateValueChange={this.updateState}
            onCompleteSteps={() =>
              updateCompany({
                variables: this.parseMutationVariables()
              })
            }
            handleBackPress={() => this.props.navigation.goBack()}
            fieldErrors={this.state.fieldErrors}
          />
        ]}
      </Mutation>
    )
  }

  parseMutationVariables = () => {
    let params = { ...this.state }
    delete params.fieldErrors

    params['phone'] = {
      number: params.phoneNumber
    }

    delete params.phoneNumber
    params['headOffice'] = this.parseAddress(params)
    params.slug = this.state.slug.replace(/\s/g, '').toLowerCase()
    delete params.companyId
    delete params['company']

    return { companyId: this.state.companyId, company: params }
  }

  parseAddress = (params): object => {
    const address = {
      street1: params.street1,
      city: params.city,
      state: params.state,
      country: params.country
    }
    delete params.street1
    delete params.city
    delete params.state
    delete params.country
    return address
  }

  onCompleted = async res => {
    const {
      updateCompany: { success, fieldErrors, data }
    } = res
    if (success) {
      const user = JSON.parse(await Auth.getCurrentUser())
      const updatedUser = { ...user, company: data }
      await Auth.setCurrentUser(updatedUser)
      const resetAction = NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'ProfileSettings' }),
          NavigationActions.navigate({
            routeName: 'BusinessProfile'
          })
        ]
      })
      this.props.setNotificationBanner(
        configureNotificationBanner('UpdateBusinessProfile')
      )
      this.props.navigation.dispatch(resetAction)
    } else {
      const parsedErrors = parseFieldErrors(fieldErrors)
      this.setState({
        fieldErrors: {
          ...parsedErrors,
          phoneNumber: parsedErrors.number || ''
        }
      })
    }
  }
}

const _EditBusinessProfileScreen: any = props => (
  <NotificationContext.Consumer>
    {({ setNotificationBanner }) => (
      <EditBusinessProfileScreen
        {...props}
        setNotificationBanner={setNotificationBanner}
      />
    )}
  </NotificationContext.Consumer>
)

_EditBusinessProfileScreen.navigationOptions = {
  header: null
}

export default _EditBusinessProfileScreen
