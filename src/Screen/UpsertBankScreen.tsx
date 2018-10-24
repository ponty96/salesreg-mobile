import React, { Component } from 'react'
import FormStepperContainer from '../Container/Form/StepperContainer'
import { UpsertBankGQL } from '../graphql/mutations/business'
import Auth from '../services/auth'
import { Mutation } from 'react-apollo'
import { parseFieldErrors } from '../Functions'
import AppSpinner from '../Components/Spinner'
import { NG_Banks } from '../utilities/data/picker-lists'

interface IProps {
  navigation: any
}

interface IState {
  accountNumber: string
  bankName: string
  isPrimary: boolean | string
  companyId: string
  fieldErrors: any
}

export default class UpsertBankScreen extends Component<IProps, IState> {
  static navigationOptions = {
    header: null
  }

  state = {
    accountNumber: '',
    bankName: '',
    isPrimary: null,
    companyId: '',
    fieldErrors: null
  }

  updateState = (key: string, val: any) => {
    const formData = { ...this.state, [key]: val }
    this.setState({ ...formData })
  }

  async componentDidMount() {
    const user = JSON.parse(await Auth.getCurrentUser())
    const bank = this.props.navigation.getParam('bank', {})
    this.setState({
      ...bank,
      isPrimary: bank.isPrimary ? 'yes' : 'no',
      companyId: user.company.id
    })
  }

  render() {
    return (
      <Mutation mutation={UpsertBankGQL} onCompleted={this.onCompleted}>
        {(upsertBank, { loading }) => [
          <AppSpinner visible={loading} key="33443&&&" />,
          <FormStepperContainer
            key="***43345"
            formData={this.state}
            steps={[
              {
                stepTitle: `What about your transactions?`,
                stepHint: `\nThis is required for us to disburse money to your account \nwhen customers makes purchases`,
                formFields: [
                  {
                    label: 'What corporate bank do you use?',
                    placeholder: 'Touch to choose',
                    type: {
                      type: 'picker',
                      options: NG_Banks
                    },
                    name: 'bankName'
                  },
                  {
                    label: 'What is your bank account number?',
                    placeholder: 'Your bank issued account number',
                    type: {
                      type: 'input'
                    },
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
    params['isPrimary'] = this.state.isPrimary == 'yes' ? true : false

    return { bank: params, bankId: bank ? bank.id : null }
  }
  onCompleted = async res => {
    const {
      upsertBank: { success, fieldErrors }
    } = res
    if (!success) {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    } else {
      this.props.navigation.navigate('Banks')
    }
  }
}
