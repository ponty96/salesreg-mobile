import React from 'react'
import FormStepperContainer from '../../../Container/Form/StepperContainer'
import { UserContext } from '../../../context/UserContext'
import AppSpinner from '../../../Components/Spinner'
import { Mutation } from 'react-apollo'
import { parseFieldErrors } from '../../../Functions'
import { NavigationActions } from 'react-navigation'
import { NotificationContext } from '../../../context/NotificationContext'
import configureNotificationBanner from '../../../Functions/configureNotificationBanner'
import { UpdateCompanyCoverPhotoGQL } from '../../../graphql/mutations/business'
import Auth from '../../../services/auth'

interface IProps {
  navigation: any
  user?: any
  resetUserContext?: (user?: any) => void
  setNotificationBanner?: (obj?: any) => void
}

interface IState {
  coverPhoto: string
  fieldErrors: any
}

class UpsertCoverPhotoScreen extends React.PureComponent<IProps, IState> {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      fieldErrors: {},
      coverPhoto:
        (this.props.user.company && this.props.user.company.coverPhoto) || ''
    }
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
    return {
      coverPhoto: {
        companyId: this.props.user.company.id,
        coverPhoto: this.state.coverPhoto
      }
    }
  }

  navigateUser = async data => {
    const user = JSON.parse(await Auth.getCurrentUser())
    const updatedUser = {
      ...user,
      company: { ...user.company, coverPhoto: data.coverPhoto }
    }

    await Auth.setCurrentUser(updatedUser)
    this.props.resetUserContext(updatedUser)

    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: 'ProfileSettings'
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
      updateCompanyCoverPhoto: { success, fieldErrors, data }
    } = res
    if (!success) {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    } else {
      this.navigateUser(data)
    }
  }

  render() {
    return (
      <Mutation
        mutation={UpdateCompanyCoverPhotoGQL}
        onCompleted={this.onCompleted}
      >
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
                    stepTitle: 'You will need a cover image(2000*560)',
                    formFields: [
                      {
                        label: '',
                        validators: ['required'],
                        name: 'coverPhoto',
                        type: {
                          type: 'image-upload'
                        },
                        underneathText:
                          'This image will be used as the cover image for your webstore'
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

const _UpsertCoverPhotoScreen: any = props => (
  <UserContext.Consumer>
    {({ user, resetUserContext }) => (
      <NotificationContext.Consumer>
        {({ setNotificationBanner }) => (
          <UpsertCoverPhotoScreen
            {...props}
            user={user}
            resetUserContext={resetUserContext}
            setNotificationBanner={setNotificationBanner}
          />
        )}
      </NotificationContext.Consumer>
    )}
  </UserContext.Consumer>
)

_UpsertCoverPhotoScreen.navigationOptions =
  UpsertCoverPhotoScreen.navigationOptions

export default _UpsertCoverPhotoScreen
