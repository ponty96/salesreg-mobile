import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import { Mutation, Query  } from 'react-apollo'


import FormStepperContainer, {
  FormStep
} from '../../../Container/Form/StepperContainer'
import { CreateDeliveryFee } from '../../../graphql/mutations/business'
import { ListCompanyDeliveryFees } from '../../../graphql/queries/business'
import { parseFieldErrors } from '../../../Functions'
import AppSpinner from '../../../Components/Spinner'
import { NotificationBanner } from '../../../Components/NotificationBanner'
import configureNotificationBanner from '../../../Functions/configureNotificationBanner'
import { UserContext } from '../../../context/UserContext'
import { States } from '../../../utilities/data/picker-lists'
import { CompanyAllowsNationwideDeliveryGQL } from '../../../graphql/queries/order'

interface IProps {
  navigation: any
  user?: any
  setNotificationBanner: (obj: any) => void
  loading: boolean
  data: any
}

interface IState {
  state: String
  region: String
  fee: String
  fieldErrors: any
  isStandardFee: String
}

// step 1 -> ask if the person delivers nation wide, if yes show input to enter amount
// step 2 ->

class CreateDeliveryFeeScreen extends Component<IProps, IState> {
  static navigationOptions = {
    header: null
  }

  state = {
    state: '',
    region: '',
    fee: '',
    fieldErrors: null,
    isStandardFee: 'No',
    deliversNationWide: this.props.data.companyAllowsNationwideDelivery.exist
      ? 'No'
      : 'Yes'
  }

  updateState = (key: string, val: any) => {
    let formData = { ...this.state, [key]: val }
    this.setState(formData)
  }

  shouldHaveRegion = () => {
    return this.state.isStandardFee.toLowerCase() == 'no' ? true : false
  }

  labelForDeliveryFeeInput = () => {
    if (this.shouldHaveRegion()) {
      return `How much is the delivery to ${this.state.region.trim()} in ${this.state.state.trim()} state`
    } else
      return `How much is your delivery fee for ${this.state.state.trim()} state`
  }

  formSteps = (): FormStep[] => {
    if (this.props.data.companyAllowsNationwideDelivery.exist) {
      return [this.step2()]
    }
    return [
      this.step1(),
      this.state.deliversNationWide.toLowerCase() == 'no' ? this.step2() : null
    ]
  }

  step1 = (): FormStep => {
    return {
      stepTitle: `Let's now create a delivery fee`,
      formFields: [
        {
          label: 'Do you deliver nation wide?',
          type: {
            type: 'radio',
            options: ['Yes', 'No']
          },
          name: 'deliversNationWide'
        },
        this.state.deliversNationWide.toLowerCase() == 'yes'
          ? {
              label: 'Whats your delivery charge?',
              placeholder: '3000',
              name: 'fee',
              type: {
                type: 'input',
                keyboardType: 'numeric'
              }
            }
          : null
      ],
      buttonTitle:
        this.state.deliversNationWide.toLowerCase() == 'no' ? 'Next' : 'Done'
    }
  }

  step2 = (): FormStep => {
    return {
      stepTitle: "Let's now create a delivery fee",
      formFields: [
        {
          label: 'What state is this delivery based on?',
          placeholder: 'Touch to choose',
          type: {
            type: 'picker',
            options: States
          },
          name: 'state'
        },
        {
          label: `Is this a standard fee across ${this.state.state}?`,
          type: {
            type: 'radio',
            options: ['Yes', 'No']
          },
          name: 'isStandardFee'
        },
        this.shouldHaveRegion()
          ? {
              label: 'What region is this delivery fee based on?',
              placeholder: 'e.g Ikeja',
              name: 'region',
              type: {
                type: 'input',
                editable: true,
                keyboardType: 'default'
              }
            }
          : null,
        {
          label: this.labelForDeliveryFeeInput(),
          placeholder: '3000',
          name: 'fee',
          type: {
            type: 'input',
            keyboardType: 'numeric'
          }
        }
      ],
      buttonTitle: 'Done'
    }
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
            formAction="create"
            steps={this.formSteps()}
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
    delete params.deliversNationWide

    if (this.state.deliversNationWide.toLowerCase() == 'yes') {
      params.state = 'Nation wide'
      params.region = 'All'
    }

    if (this.state.isStandardFee.toLowerCase() == 'yes') {
      params.region = 'All'
    }

    return { deliveryFee: { companyId, userId, ...params } }
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

const isLoading = (data, networkStatus, loading) =>
  Object.keys(data || {}).length == 0 &&
  (networkStatus != 2 && networkStatus != 4 && networkStatus != 8) &&
  loading

const _CreateDeliveryFeeScreen: any = props => (
  <UserContext.Consumer>
    {({ user }) => (
      <Query
        query={CompanyAllowsNationwideDeliveryGQL}
        variables={{ companyId: user.company.id }}
        fetchPolicy="network-only"
      >
        {({ data, loading, networkStatus }) =>
          isLoading(data, networkStatus, loading) ? (
            <AppSpinner visible={isLoading(data, networkStatus, loading)} />
          ) : (
            <CreateDeliveryFeeScreen
              {...props}
              user={user}
              loading={loading}
              data={data}
            />
          )
        }
      </Query>
    )}
  </UserContext.Consumer>
)

_CreateDeliveryFeeScreen.navigationOptions =
  CreateDeliveryFeeScreen.navigationOptions

export default _CreateDeliveryFeeScreen
