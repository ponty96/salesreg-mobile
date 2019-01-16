import React from 'react'
import FormStepperContainer from '../../../Container/Form/StepperContainer'
import { UserContext } from '../../../context/UserContext'
import AppSpinner from '../../../Components/Spinner'
import { Mutation } from 'react-apollo'
import { parseFieldErrors } from '../../../Functions'
import { NavigationActions } from 'react-navigation'
import { NotificationContext } from '../../../context/NotificationContext'
import configureNotificationBanner from '../../../Functions/configureNotificationBanner'
import { UpdateCoverPhotoGQL } from '../../../graphql/mutations/business'

interface IProps {
  navigation: any
  user?: any
  setNotificationBanner?: (obj?: any) => void
}

interface IState {
  coverPhoto: string
  fieldErrors: any
}

class UpsertCoverPhoto extends React.PureComponent<IProps, IState> {
  static navigationOptions = {
    header: null
  }

  state = {
    fieldErrors: {},
    coverPhoto: ''
  }

  updateState = (key: string, val: string) => {
    const formData = {
      ...this.state,
      [key]: val
    }

    this.setState({
      ...formData
    })
  }

  parseMutationVariables = () => {
    let params = { ...this.state }
    delete params.fieldErrors

    return params
  }

  navigateUser = () => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: 'ProfileSettingsScreen'
        }),
        NavigationActions.navigate({
          routeName: 'WebstoreOptions'
        })
      ]
    })
    this.props.setNotificationBanner(
      configureNotificationBanner('UpdateCoverPhoto')
    )
    this.props.navigation.dispatch(resetAction)
  }

  onCompleted = async res => {
    const {
      updateCoverPhoto: { success, fieldErrors }
    } = res
    if (!success) {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    } else {
      this.navigateUser()
    }
  }

  render() {
    return (
      <Mutation mutation={UpdateCoverPhotoGQL} onCompleted={this.onCompleted}>
        {(updateCoverPhoto, { loading }) => {
          return (
            <React.Fragment>
              <AppSpinner visible={loading} />
              <FormStepperContainer
                fieldErrors={this.state.fieldErrors}
                handleBackPress={() => this.props.navigation.goBack()}
                formData={this.state}
                updateValueChange={this.updateState}
                onCompleteSteps={() =>
                  updateCoverPhoto({ variables: this.parseMutationVariables() })
                }
                steps={[
                  {
                    stepTitle: "Let's add a cover photo to your webstore",
                    stepHint:
                      'The cover photo would be displayed on your webstore giving the effects of an imagery title.',
                    formFields: [
                      {
                        label: '',
                        validators: ['required'],
                        name: 'coverPhoto',
                        type: {
                          type: 'image-upload'
                        }
                      }
                    ],
                    buttonTitle: 'Done'
                  }
                ]}
              />
            </React.Fragment>
          )
        }}
      </Mutation>
    )
  }
}

const _UpsertCoverPhoto: any = props => (
  <UserContext.Consumer>
    {({ user }) => (
      <NotificationContext.Consumer>
        {({ setNotificationBanner }) => (
          <UpsertCoverPhoto
            {...props}
            user={user}
            setNotificationBanner={setNotificationBanner}
          />
        )}
      </NotificationContext.Consumer>
    )}
  </UserContext.Consumer>
)

_UpsertCoverPhoto.navigationOptions = UpsertCoverPhoto.navigationOptions

export default _UpsertCoverPhoto
