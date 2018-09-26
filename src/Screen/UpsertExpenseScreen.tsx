import React, { Component } from 'react'
import FormStepperContainer from '../Container/Form/StepperContainer'
import { UpsertExpenseGQL } from '../graphql/mutations/expense'
import Auth from '../services/auth'
import { Mutation } from 'react-apollo'
import { parseFieldErrors } from '../Functions'
import AppSpinner from '../Components/Spinner'
import { PaymentMethod } from '../utilities/data/picker-lists'

interface IProps {
  navigation: any
}

interface IState {
  title: string
  totalAmount: any
  date: string
  expenseItems: any[]
  paidById: string
  companyId: string
  paymentMethod: string
  fieldErrors: any
  __typename?: any
  company?: any
  paidBy?: any
}

export default class UpsertExpenseScreen extends Component<IProps, IState> {
  static navigationOptions = {
    header: null
  }

  state = {
    title: '',
    date: '',
    totalAmount: null,
    expenseItems: [],
    paidById: '',
    companyId: '',
    paymentMethod: '',
    fieldErrors: null
  }

  updateState = (key: string, val: any) => {
    const formData = { ...this.state, [key]: val }
    this.setState({ ...formData })
  }

  async componentDidMount() {
    const user = JSON.parse(await Auth.getCurrentUser())
    const expense = this.props.navigation.getParam('expense', null)
    let state = {}
    if (expense) {
      console.log(
        'paymemt method',
        expense.paymentMethod
          .split(' ')
          .join('_')
          .toUpperCase()
      )
      state = {
        ...expense,
        paymentMethod: expense.paymentMethod
          .split(' ')
          .join('_')
          .toUpperCase()
      }
    }
    state = { ...state, paidById: user.id, companyId: user.company.id }
    this.setState(state)
  }

  render() {
    return (
      <Mutation mutation={UpsertExpenseGQL} onCompleted={this.onCompleted}>
        {(upsertExpense, { loading }) => [
          <AppSpinner visible={loading} />,
          <FormStepperContainer
            formData={this.state}
            steps={[
              {
                stepTitle: 'Lets now describe your expense',
                formFields: [
                  {
                    label: 'What should we call this expense?',
                    placeholder: 'e.g Shop renovation',
                    name: 'title',
                    type: {
                      type: 'input',
                      keyboardType: 'default'
                    }
                  },
                  {
                    label: 'When did you make this expense?',
                    placeholder: 'e.g 06/23/2018',
                    name: 'date',
                    type: {
                      type: 'date'
                    }
                  },
                  {
                    label: 'What did you spend in total?',
                    placeholder: `\u20A6 0.0`,
                    name: 'totalAmount',
                    type: {
                      type: 'input',
                      keyboardType: 'numeric'
                    }
                  },
                  {
                    label: 'How did you pay for this expense?',
                    placeholder: 'Touch to choose',
                    type: {
                      type: 'picker',
                      options: PaymentMethod
                    },
                    name: 'paymentMethod'
                  }
                ]
              },
              {
                stepTitle: `Across what items did you spread this expense \n(optional)?`,
                formFields: [
                  {
                    label: '',
                    type: {
                      type: 'expense-items'
                    },
                    name: 'expenseItems'
                  }
                ],
                buttonTitle: 'Done'
              }
            ]}
            updateValueChange={this.updateState}
            handleBackPress={() => this.props.navigation.goBack()}
            fieldErrors={this.state.fieldErrors}
            onCompleteSteps={() =>
              upsertExpense({ variables: this.parseMutationVariables() })
            }
          />
        ]}
      </Mutation>
    )
  }

  parseMutationVariables = () => {
    const expense = this.props.navigation.getParam('expense', {})
    let params = { ...this.state }
    params['totalAmount'] = parseFloat(params.totalAmount)
    params = this.clearParams(params)

    return { expense: params, expenseId: expense ? expense.id : null }
  }
  clearParams = params => {
    delete params.fieldErrors
    delete params['__typename']
    delete params['company']
    delete params['paidBy']
    delete params['id']
    params.expenseItems = params.expenseItems.map(expenseItem => {
      let expense = { ...expenseItem }
      delete expense.__typename
      delete expense.id
      return { ...expense, amount: parseFloat(expense.amount) }
    })
    return params
  }
  onCompleted = async res => {
    const {
      upsertExpense: { success, fieldErrors }
    } = res
    if (!success) {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    } else {
      this.props.navigation.navigate('Expenses')
    }
  }
}
