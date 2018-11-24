import React, { Component } from 'react'
import { UpdateUserGQL } from '../graphql/mutations/user'
import Auth from '../services/auth'
import { Mutation } from 'react-apollo'
import { parseFieldErrors } from '../Functions'
import AppSpinner from '../Components/Spinner'
import FormStepperContainer from '../Container/Form/StepperContainer'
import { NavigationActions } from 'react-navigation'

interface IProps {
  navigation: any
}

interface IState {
  profilePicture: string
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  fieldErrors: any
}

export default class EditUserProfileScreen extends Component<IProps, IState> {
  state = {
    profilePicture: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    fieldErrors: null
  }

  componentWillMount() {
    this.updateDetails()
  }
  getImage = (_pic: any) => {}

  updateState = (key: string, value: any) => {
    const data = { ...this.state, [key]: value }
    this.setState(data)
  }

  updateDetails = async () => {
    const user = JSON.parse(await Auth.getCurrentUser())

    this.setState({
      firstName: user.firstName,
      lastName: user.lastName,
      dateOfBirth: user.dateOfBirth,
      profilePicture: user.profilePicture || '',
      gender: user.gender.toLowerCase()
    })
  }

  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <Mutation mutation={UpdateUserGQL} onCompleted={this.onCompleted}>
        {(updateUser, { loading }) => [
          <AppSpinner visible={loading} />,
          <FormStepperContainer
            formData={this.state}
            steps={[
              {
                stepTitle: 'Edit your profile details',
                formFields: [
                  {
                    label: 'Whats your first name?',
                    placeholder: 'E.g John',
                    type: {
                      type: 'input',
                      keyboardType: 'default'
                    },
                    name: 'firstName'
                  },
                  {
                    label: 'Whats your last name?',
                    placeholder: 'E.g Doe',
                    type: {
                      type: 'input',
                      keyboardType: 'default'
                    },
                    name: 'lastName'
                  },
                  {
                    label: 'Are you male or female?',
                    placeholder: 'E.g Doe',
                    type: {
                      type: 'radio',
                      options: ['male', 'female']
                    },
                    name: 'gender'
                  },
                  {
                    label: `Date of Birth?`,
                    placeholder: 'e.g 06/23/2018',
                    name: 'dateOfBirth',
                    type: {
                      type: 'date'
                    }
                  }
                ]
              },
              {
                stepTitle: `Your profile photo(1MB \nor less)`,
                formFields: [
                  {
                    label: '',
                    name: 'profilePicture',
                    type: {
                      type: 'image-upload'
                    },
                    underneathText: ''
                  }
                ],
                buttonTitle: 'Update'
              }
            ]}
            updateValueChange={this.updateState}
            onCompleteSteps={() =>
              updateUser({ variables: this.parseMutationVariables() })
            }
            handleBackPress={() => this.props.navigation.goBack()}
            fieldErrors={this.state.fieldErrors}
          />
        ]}
      </Mutation>
    )
  }
  parseMutationVariables = () => {
    let params = {
      ...this.state,
      gender: this.state.gender ? this.state.gender.toUpperCase() : ''
    }
    delete params.fieldErrors
    return { user: params }
  }
  onCompleted = async res => {
    console.log('res', res)
    const {
      updateUser: { success, fieldErrors, data }
    } = res
    if (success) {
      await Auth.setCurrentUser(data)
      const resetAction = NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'ProfileSettings' }),
          NavigationActions.navigate({
            routeName: 'UserProfile'
          })
        ]
      })
      this.props.navigation.dispatch(resetAction)
    } else {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    }
  }
}
