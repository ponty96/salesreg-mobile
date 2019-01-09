import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import AppSpinner from '../Spinner'
import { UpsertContactGQL } from '../../graphql/mutations/contact'
import { CompanyContactGQL } from '../../graphql/queries/contact'
import { parseFieldErrors, capitalize } from '../../Functions'
import FormStepperContainer from '../../Container/Form/StepperContainer'
import { Countries } from '../../utilities/data/picker-lists'
import { UserContext } from '../../context/UserContext'
import { NavigationActions } from 'react-navigation'
import { NotificationContext } from '../../context/NotificationContext'
import configureNotificationBanner from '../../Functions/configureNotificationBanner'

interface IProps {
  navigation: any
  contact: any
  user: any
  successRoute: string
  contactType: string
  setNotificationBanner: (obj: any) => void
}

const genderToPossesivePronoun = gender => {
  if (gender == 'Male') return 'His'
  return 'Her'
}

const genderToPronoun = gender => {
  if (gender == 'Female') return 'she'
  return 'he'
}

class UpsertContactForm extends Component<IProps> /*, IState*/ {
  state = {
    contactName: '',
    email: '',
    gender: '',
    // step 1
    image: '',
    // step 3
    street1: '',
    city: '',
    state: '',
    country: 'NG',
    // step 4
    number: '',
    instagram: '',
    twitter: '',
    facebook: '',
    allowsMarketing: 'No',
    // snapchat: '',
    // last step
    birthday: new Date('1 January 1990'),
    // other required fields
    userId: '',
    companyId: '',
    fieldErrors: null
  }

  componentDidMount() {
    const { contact } = this.props
    let details = {}
    if (contact) {
      const { address = {}, phone, birthday } = contact
      details = {
        ...contact,
        ...address,
        ...phone,
        birthday: birthday || new Date('1 January 1990'),
        gender: contact.gender
          ? `${contact.gender[0].toUpperCase()}${contact.gender
              .toLowerCase()
              .substring(1)}`
          : '',
        image: contact.image ? contact.image : ''
      }
    }
    this.updateDetails(details)
  }

  updateDetails = async (details: any) => {
    let { user } = this.props

    this.setState({
      userId: user.id,
      companyId: user.company.id,
      ...details
    })
  }

  updateState = (key: string, value: any) => {
    this.setState({ [key]: value })
  }

  render() {
    const firstName = this.state.contactName
      ? this.state.contactName.split(' ')[0]
      : ''
    const parsedGender = genderToPossesivePronoun(this.state.gender)
    const contact = this.props.contact || {}

    return (
      <Mutation
        mutation={UpsertContactGQL}
        refetchQueries={[
          {
            query: CompanyContactGQL,
            variables: {
              queryText: '',
              companyId: this.state.companyId,
              type: this.props.contactType,
              first: 10,
              after: null
            }
          }
        ]}
        awaitRefetchQueries={true}
        onCompleted={this.onCompleted}
      >
        {(upsertContact, { loading }) => [
          <AppSpinner visible={loading} />,
          <FormStepperContainer
            formAction={Object.keys(contact).length > 0 && 'update'}
            formData={this.state}
            updateValueChange={this.updateState}
            handleBackPress={() => this.props.navigation.goBack()}
            fieldErrors={this.state.fieldErrors}
            steps={[
              {
                stepTitle: `Let's know this ${this.props.contactType}`,
                formFields: [
                  {
                    label: 'Name?',
                    placeholder: 'John Doe',
                    validators: ['required'],
                    name: 'contactName',
                    type: {
                      type: 'input'
                    }
                  },
                  {
                    label: 'Email?',
                    placeholder: 'someone@address.com',
                    name: 'email',
                    validators: ['required', 'email'],
                    type: {
                      type: 'input',
                      keyboardType: 'email-address'
                    }
                  },
                  {
                    label: 'Gender?',
                    placeholder: 'E.g Doe',
                    validators: ['required'],
                    type: {
                      type: 'radio',
                      options: ['Male', 'Female']
                    },
                    name: 'gender'
                  }
                ]
              },
              {
                stepTitle: `Add ${firstName}'s photo(3MB \nor less)`,
                formFields: [
                  {
                    label: '',
                    name: 'image',
                    type: {
                      type: 'image-upload',
                      uploadCategory: 'profile-photo'
                    },
                    underneathText: ''
                  }
                ]
              },
              {
                stepTitle: `${parsedGender} address?`,
                formFields: [
                  {
                    label: 'Street',
                    placeholder: '123 Street',
                    validators: ['required'],
                    name: 'street1',
                    type: {
                      type: 'input'
                    }
                  },
                  {
                    label: 'City',
                    validators: ['required'],
                    placeholder: 'City name',
                    name: 'city',
                    type: {
                      type: 'input'
                    }
                  },
                  {
                    label: 'State',
                    placeholder: 'State name',
                    validators: ['required'],
                    name: 'state',
                    type: {
                      type: 'input'
                    }
                  },
                  {
                    label: 'Country',
                    validators: ['required'],
                    placeholder: 'Touch to choose',
                    type: {
                      type: 'picker',
                      options: Countries
                    },
                    name: 'country'
                  }
                ]
              },
              {
                stepTitle: `How can you contact ${firstName}\n`,
                stepHint: '(please scroll down)',
                formFields: [
                  {
                    label: `${parsedGender} phone number?`,
                    type: {
                      type: 'phone-input'
                    },
                    validators: ['required', 'phone'],
                    name: 'number',
                    extraData: {
                      countryCode: this.state.country
                    }
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
                    label: `Does ${genderToPronoun(
                      this.state.gender
                    )} allow marketing?`,
                    placeholder: 'E.g Doe',
                    type: {
                      type: 'radio',
                      options: ['Yes', 'No']
                    },
                    name: 'allowsMarketing'
                  }
                ]
              },
              {
                stepTitle: 'Other personal details',
                formFields: [
                  {
                    label: `What's ${firstName}'s birthday?`,
                    placeholder: 'e.g 06/23/2018',
                    name: 'birthday',
                    type: {
                      type: 'date'
                    }
                  }
                ],
                buttonTitle: 'Done'
              }
            ]}
            onCompleteSteps={() =>
              upsertContact({ variables: this.parseMutationVariables() })
            }
          />
        ]}
      </Mutation>
    )
  }
  parseMutationVariables = () => {
    const { street1, state, city, country, number } = this.state
    const { contact = {} } = this.props
    let params = { ...this.state }
    delete params.street1
    delete params.city
    delete params.state
    delete params.country
    delete params.number
    delete params.fieldErrors
    delete params['__typename']
    delete params['id']
    delete params['totalAmountPaid']
    delete params['totalDebt']
    delete params['data']

    return {
      contact: {
        ...params,
        type: this.props.contactType,
        gender: this.state.gender.toUpperCase(),
        address: {
          street1,
          state,
          city,
          country
        },
        phone: {
          number
        }
      },
      contactId: contact ? contact.id : null
    }
  }
  onCompleted = async res => {
    const {
      upsertContact: { success, fieldErrors, data }
    } = res
    if (success) {
      const { contact } = this.props
      const resetAction = NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({
            routeName: this.props.successRoute
          }),
          NavigationActions.navigate({
            routeName: `${capitalize(this.props.contactType)}Details`,
            params: { [`${this.props.contactType}`]: data }
          })
        ]
      })

      this.props.setNotificationBanner(
        Object.keys(contact).length == 0
          ? configureNotificationBanner('AddContact', this.state)
          : configureNotificationBanner('UpdateContact', this.state)
      )
      this.props.navigation.dispatch(resetAction)
    } else {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    }
  }
}

const _UpsertContactForm = props => (
  <UserContext.Consumer>
    {({ user }) => (
      <NotificationContext.Consumer>
        {({ setNotificationBanner }) => (
          <UpsertContactForm
            {...props}
            user={user}
            setNotificationBanner={setNotificationBanner}
          />
        )}
      </NotificationContext.Consumer>
    )}
  </UserContext.Consumer>
)

export default _UpsertContactForm
