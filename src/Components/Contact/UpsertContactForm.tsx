import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import AppSpinner from '../Spinner'
import { UpsertContactGQL } from '../../graphql/mutations/contact'
import { CompanyContactGQL } from '../../graphql/queries/contact'
import { parseFieldErrors } from '../../Functions'
import FormStepperContainer from '../../Container/Form/StepperContainer'
import { Countries } from '../../utilities/data/picker-lists'
import { UserContext } from '../../context/UserContext'

interface IProps {
  navigation: any
  contact: any
  user: any
  successRoute: string
  contactType: string
}

const genderToPossesivePronoun = gender => {
  if (gender == 'Male') return 'His'
  return 'Her'
}

const genderToPronoun = gender => {
  if (gender == 'Female') return 'he'
  return 'she'
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
    birthday: '',
    // other required fields
    userId: '',
    companyId: '',
    fieldErrors: null
  }

  componentDidMount() {
    const { contact } = this.props
    let details = {}
    if (contact) {
      const { address = {}, phone } = contact
      details = {
        ...contact,
        ...address,
        ...phone,
        gender: contact.gender ? contact.gender.toLowerCase() : '',
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
    console.log('contact state', this.state)
    return (
      <Mutation
        mutation={UpsertContactGQL}
        refetchQueries={[
          {
            query: CompanyContactGQL,
            variables: {
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
            formData={this.state}
            updateValueChange={this.updateState}
            handleBackPress={() => this.props.navigation.goBack()}
            fieldErrors={this.state.fieldErrors}
            steps={[
              {
                stepTitle: `Lets know this ${this.props.contactType}`,
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
                stepTitle: `Add ${firstName}'s photo(1MB \nor less)`,
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
      upsertContact: { success, fieldErrors }
    } = res
    if (success) {
      this.props.navigation.navigate(this.props.successRoute)
    } else {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    }
  }
}

const _UpsertContactForm = props => (
  <UserContext.Consumer>
    {({ user }) => <UpsertContactForm {...props} user={user} />}
  </UserContext.Consumer>
)

export default _UpsertContactForm
