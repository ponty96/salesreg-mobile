import React, { Component } from 'react'
import { UpdateUserGQL } from '../graphql/mutations/user'
import Auth from '../services/auth'
import { Mutation } from 'react-apollo'
import { parseFieldErrors } from '../Functions'
import AppSpinner from '../Components/Spinner'
import FormStepperContainer from '../Container/Form/StepperContainer'
import { NavigationActions } from 'react-navigation'
import { NotificationBanner } from '../Components/NotificationBanner'
import configureNotificationBanner from '../Functions/configureNotificationBanner'
import { UserContext } from '../context/UserContext'

interface IProps {
  navigation: any
  user: any
  resetUserContext: (obj?: any) => void
  setNotificationBanner: (obj: any) => void
}

interface IState {
  profilePicture: string
  firstName: string
  lastName: string
  dateOfBirth: string | Date
  gender: string
  fieldErrors: any
}

class EditUserProfileScreen extends Component<IProps, IState> {
  static navigationOptions = {
    header: null
  }

  state = {
    profilePicture: '',
    firstName: '',
    lastName: '',
    dateOfBirth: new Date('1 January 1990'),
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
    const user = this.props.user

    this.setState({
      firstName: user.firstName,
      lastName: user.lastName,
      dateOfBirth: user.dateOfBirth || new Date('1 January 1990'),
      profilePicture: user.profilePicture || '',
      gender: user.gender.toLowerCase()
    })
  }

  render() {
    return (
      <Mutation mutation={UpdateUserGQL} onCompleted={this.onCompleted}>
        {(updateUser, { loading }) => [
          <AppSpinner visible={loading} />,
          <FormStepperContainer
            formAction="update"
            formData={this.state}
            steps={[
              {
                stepTitle: 'Edit your profile details',
                formFields: [
                  {
                    label: "What's your first name?",
                    placeholder: 'E.g John',
                    type: {
                      type: 'input',
                      keyboardType: 'default'
                    },
                    validators: ['required'],
                    name: 'firstName'
                  },
                  {
                    label: "What's your last name?",
                    placeholder: 'E.g Doe',
                    type: {
                      type: 'input',
                      keyboardType: 'default'
                    },
                    validators: ['required'],
                    name: 'lastName'
                  },
                  {
                    label: 'Are you male or female?',
                    placeholder: 'E.g Doe',
                    type: {
                      type: 'radio',
                      options: ['male', 'female']
                    },
                    validators: ['required'],
                    name: 'gender'
                  },
                  {
                    label: `Date of Birth?`,
                    placeholder: 'e.g 06/23/2018',
                    validators: ['required'],
                    name: 'dateOfBirth',
                    type: {
                      type: 'date'
                    }
                  }
                ]
              },
              {
                stepTitle: `Your profile photo(3MB \nor less)`,
                formFields: [
                  {
                    label: '',
                    name: 'profilePicture',
                    type: {
                      type: 'image-upload',
                      uploadCategory: 'profile-photo'
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
    const params = {
      ...this.state,
      gender: this.state.gender ? this.state.gender.toUpperCase() : ''
    }
    delete params.fieldErrors
    return { user: params }
  }

  onCompleted = async res => {
    const {
      updateUser: { success, fieldErrors, data }
    } = res

    if (success) {
      await Auth.setCurrentUser(data)
      this.props.resetUserContext(data)
      const resetAction = NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'ProfileSettings' }),
          NavigationActions.navigate({
            routeName: 'UserProfile'
          })
        ]
      })

      let banner = NotificationBanner(
        configureNotificationBanner('UpdateProfile')
      )
      banner.show({ bannerPosition: 'bottom' })

      this.props.navigation.dispatch(resetAction)
    } else {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    }
  }
}

const _EditUserProfileScreen: any = props => (
  <UserContext.Consumer>
    {({ user, resetUserContext }) => (
      <EditUserProfileScreen
        {...props}
        user={user}
        resetUserContext={resetUserContext}
      />
    )}
  </UserContext.Consumer>
)

_EditUserProfileScreen.navigationOptions =
  EditUserProfileScreen.navigationOptions

export default _EditUserProfileScreen
