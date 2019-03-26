import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { NavigationActions } from 'react-navigation'

import FormStepperContainer from '../../Container/Form/StepperContainer'
import { UpsertBankGQL } from '../../graphql/mutations/business'
import { ListCompanyBanksGQL } from '../../graphql/queries/business'
import { parseFieldErrors } from '../../Functions'
import AppSpinner from '../../Components/Spinner'
import { NG_Banks } from '../../utilities/data/picker-lists'
import Auth from '../../services/auth'
import { NotificationBanner } from '../../Components/NotificationBanner'
import configureNotificationBanner from '../../Functions/configureNotificationBanner'
import { UserContext } from '../../context/UserContext'

interface IProps {
  navigation: any
  setNotificationBanner: (obj: any) => void
  user: any
  resetUserContext: (obj?: any) => void
}

interface IState {
  accountNumber: string
  bankName: string
  isPrimary: boolean | string
  companyId: string
  fieldErrors: any
  bankCode: string
}

class UpsertBankScreen extends Component<IProps, IState> {
  static navigationOptions = {
    header: null
  }

  state = {
    accountNumber: '',
    bankName: '',
    isPrimary: null,
    companyId: '',
    fieldErrors: null,
    bankCode: ''
  }

  updateState = (key: string, val: any) => {
    const formData = { ...this.state, [key]: val }
    this.setState({ ...formData })
  }

  async componentDidMount() {
    const user = this.props.user
    const bank = this.props.navigation.getParam('bank', {})
    this.setState({
      ...bank,
      isPrimary: bank.isPrimary ? 'yes' : 'no',
      companyId: user.company.id
    })
  }

  render() {
    const bank = this.props.navigation.getParam('bank', {}),
      _bank = bank || {}

    return (
      <Mutation
        mutation={UpsertBankGQL}
        refetchQueries={[
          {
            query: ListCompanyBanksGQL,
            variables: {
              companyId: this.state.companyId,
              first: 10,
              after: null
            }
          }
        ]}
        awaitRefetchQueries={true}
        onCompleted={this.onCompleted}
      >
        {(upsertBank, { loading }) => [
          <AppSpinner visible={loading} key="33443&&&" />,
          <FormStepperContainer
            key="***43345"
            formData={this.state}
            formAction={Object.keys(_bank).length > 0 && 'update'}
            steps={[
              {
                stepTitle: `What about your transactions?`,
                stepHint: `\nThis is required for us to disburse money to your account when customers makes purchases`,
                formFields: [
                  {
                    label: 'What corporate bank do you use?',
                    placeholder: 'Touch to choose',
                    type: {
                      type: 'picker',
                      options: NG_Banks
                    },
                    validators: ['required'],
                    name: 'bankName'
                  },
                  {
                    label: 'What is your bank account number?',
                    placeholder: 'Your bank issued account number',
                    type: {
                      type: 'input',
                      keyboardType: 'phone-pad'
                    },
                    validators: ['required'],
                    name: 'accountNumber'
                  },
                  {
                    label: `Is this your primary account?`,
                    placeholder: 'E.g Doe',
                    type: {
                      type: 'radio',
                      options: ['yes', 'no']
                    },
                    name: 'isPrimary'
                  }
                ],
                buttonTitle: 'Save Bank'
              }
            ]}
            updateValueChange={this.updateState}
            handleBackPress={() => this.props.navigation.goBack()}
            fieldErrors={this.state.fieldErrors}
            onCompleteSteps={() =>
              upsertBank({ variables: this.parseMutationVariables() })
            }
          />
        ]}
      </Mutation>
    )
  }

  parseMutationVariables = () => {
    const bank = this.props.navigation.getParam('bank', {})
    let params = { ...this.state }
    delete params.fieldErrors
    delete params['id']
    delete params['__typename']
    delete params['date']
    delete params['subaccountId']
    delete params['subaccountTransacId']
    delete params['company']
    params['isPrimary'] = this.state.isPrimary == 'yes' ? true : false
    params.bankCode = params.bankName
    params['accountName'] =
      this.state['accountName'] || this.props.user.company.title

    return { bank: params, bankId: bank ? bank.id : null }
  }

  onCompleted = async res => {
    const {
      upsertBank: { success, fieldErrors, data }
    } = res
    const bank = this.props.navigation.getParam('bank', {})

    if (!success) {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    } else {
      let updatedUser = {
        ...this.props.user,
        company: { ...this.props.user.company, bank: data }
      }

      this.props.resetUserContext(updatedUser)
      await Auth.setCurrentUser(updatedUser)

      const resetAction = NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({
            routeName: 'Banks'
          }),
          NavigationActions.navigate({
            routeName: 'BankDetails',
            params: { bank: data }
          })
        ]
      })

      let banner = NotificationBanner(
        configureNotificationBanner(
          Object.keys(bank).length == 0
            ? 'CreateBankAccount'
            : 'UpdateBankAccount',
          this.state
        )
      )
      banner.show({ bannerPosition: 'bottom' })

      this.props.navigation.dispatch(resetAction)
    }
  }
}

const _UpsertBankScreen: any = props => (
  <UserContext.Consumer>
    {({ user, resetUserContext }) => (
      <UpsertBankScreen
        {...props}
        user={user}
        resetUserContext={resetUserContext}
      />
    )}
  </UserContext.Consumer>
)

_UpsertBankScreen.navigationOptions = UpsertBankScreen.navigationOptions

export default _UpsertBankScreen
