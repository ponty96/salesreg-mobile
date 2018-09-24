import React, { Component } from 'react'
// import Header from '../Components/Header/BaseHeader'
import FormStepperContainer from '../Container/Form/StepperContainer'

interface IProps {
  navigation: any
}

interface IState {
  title: string
  totalAmount: string
  date: string
  fieldErrors: any
}

export default class UpsertExpenseScreen extends Component<IProps, IState> {
  static navigationOptions = {
    header: null
  }

  state = {
    title: '',
    date: '',
    totalAmount: '',
    fieldErrors: null
  }

  updateState = (key: string, val: any) => {
    const formData = { ...this.state, [key]: val }
    this.setState({ ...formData })
  }

  render() {
    return (
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
              }
            ]
          }
        ]}
        updateValueChange={this.updateState}
        handleBackPress={() => this.props.navigation.goBack()}
        fieldErrors={this.state.fieldErrors}
        onCompleteSteps={this.handleSuccess}
      />
    )
  }

  handleSuccess = () => {}
}
