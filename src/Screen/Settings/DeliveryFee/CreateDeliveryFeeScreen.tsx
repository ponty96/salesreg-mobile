import React, { Component } from 'react'
import FormStepperContainer from '../../../Container/Form/StepperContainer'
import { CreateDeliveryFee } from '../../../graphql/mutations/business'
import { ListCompanyDeliveryFees } from '../../../graphql/queries/business'
import { Mutation } from 'react-apollo'
import { parseFieldErrors } from '../../../Functions'
import AppSpinner from '../../../Components/Spinner'
import { NavigationActions } from 'react-navigation'
import { NotificationBanner } from '../../../Components/NotificationBanner'
import configureNotificationBanner from '../../../Functions/configureNotificationBanner'
import { UserContext } from '../../../context/UserContext'

interface IProps {
  navigation: any
  user?: any
  setNotificationBanner: (obj: any) => void
}

interface IState {
  location: String
  price: String
  fieldErrors: any
  isStandardFee: String
}

class CreateDeliveryFeeScreen extends Component<IProps, IState> {
  static navigationOptions = {
    header: null
  }

  state = {
    location: '',
    price: '',
    fieldErrors: null,
    isStandardFee: 'No'
  }

  updateState = (key: string, val: any) => {
    let formData = { ...this.state, [key]: val }
    if (key == 'isStandardFee' && val.toLowerCase() == 'yes')
      formData = { ...formData, location: 'Others' }
    else if (key == 'isStandardFee' && val.toLowerCase() == 'no')
      formData = { ...formData, location: '' }
    this.setState({ ...formData })
  }

  render() {
    return (
      <Mutation
        mutation={CreateDeliveryFee}
        onCompleted={this.onCompleted}
        refetchQueries={[
          {
            query: ListCompanyDeliveryFees,
            variables: {
              companyId: this.props.user.company.id
            }
          }
        ]}
        awaitRefetchQueries={true}
      >
        {(createDeliveryFee, { loading }) => [
          <AppSpinner visible={loading} />,
          <FormStepperContainer
            formData={this.state}
            steps={[
              {
                stepTitle: "Let's now create a delivery fee",
                formFields: [
                  {
                    label: `Is this a standard fee?`,
                    type: {
                      type: 'radio',
                      options: ['Yes', 'No']
                    },
                    name: 'isStandardFee'
                  },
                  {
                    label: 'What location is this delivery fee based on?',
                    placeholder: 'e.g Lagos',
                    name: 'location',
                    type: {
                      type: 'input',
                      editable:
                        this.state.isStandardFee.toLowerCase() == 'yes'
                          ? false
                          : true,
                      keyboardType: 'default'
                    }
                  },
                  {
                    label: `How much is the delivery to ${this.state.location.trim()}`,
                    placeholder: '3000',
                    name: 'price',
                    type: {
                      type: 'input',
                      keyboardType: 'numeric'
                    }
                  }
                ],
                buttonTitle: 'Done'
              }
            ]}
            updateValueChange={this.updateState}
            handleBackPress={() => this.props.navigation.goBack()}
            fieldErrors={this.state.fieldErrors}
            onCompleteSteps={() =>
              createDeliveryFee({ variables: this.parseMutationVariables() })
            }
          />
        ]}
      </Mutation>
    )
  }

  parseMutationVariables = () => {
    let params = { ...this.state },
      {
        user: {
          company: { id: companyId },
          id: userId
        }
      } = this.props

    delete params.isStandardFee
    delete params.fieldErrors

    return { companyId, userId, ...params }
  }

  onCompleted = async res => {
    const {
      createDeliveryFee: { success, fieldErrors }
    } = res

    if (!success) {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    } else {
      const resetAction = NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({
            routeName: 'ProfileSettings'
          }),
          NavigationActions.navigate({
            routeName: 'DeliveryFees'
          })
        ]
      })

      let banner = NotificationBanner(
        configureNotificationBanner('CreateDeliveryFee', this.state)
      )
      banner.show({ bannerPosition: 'bottom' })
      this.props.navigation.dispatch(resetAction)
    }
  }
}

const _CreateDeliveryFeeScreen: any = props => (
  <UserContext.Consumer>
    {({ user }) => <CreateDeliveryFeeScreen {...props} user={user} />}
  </UserContext.Consumer>
)

_CreateDeliveryFeeScreen.navigationOptions =
  CreateDeliveryFeeScreen.navigationOptions

export default _CreateDeliveryFeeScreen
