import React from 'react'
import FormStepperContainer from '../Container/Form/StepperContainer'

interface IProps {
  navigation: any
}

interface IState {
  salesItems: any[]
  fieldErrors: any
  customerName: string
  isCustomerInContacts: any
}

export default class UpsertSalesOrderScreen extends React.PureComponent<
  IProps,
  IState
> {
  static navigationOptions = {
    header: null
  }

  state = {
    salesItems: [{ itemName: '', amount: '', quantity: '' }],
    fieldErrors: null,
    isCustomerInContacts: null,
    customerName: ''
  }

  updateState = (key: string, val: any) => {
    const formData = { ...this.state, [key]: val }
    this.setState({ ...formData })
  }

  onCompleted = async res => {
    console.log(res)
  }

  render() {
    let { isCustomerInContacts } = this.state

    return (
      <FormStepperContainer
        formData={this.state}
        updateValueChange={this.updateState}
        handleBackPress={() => this.props.navigation.goBack()}
        fieldErrors={this.state.fieldErrors}
        steps={[
          {
            stepTitle: 'Lets have the items that are being ordered',
            formFields: [
              {
                label: '',
                type: {
                  type: 'sales-order-items',
                  options: [{ mainLabel: 'Orange', value: 'orange' }]
                },
                name: 'salesItems'
              }
            ]
          },
          {
            stepTitle: 'Who is making this order?',
            formFields: [
              {
                label: 'Is this customer in your contacts?',
                type: {
                  type: 'radio',
                  options: ['No', 'Yes']
                },
                name: 'isCustomerInContacts'
              },
              isCustomerInContacts == 'No'
                ? {
                    label: 'Customer name?',
                    type: {
                      type: 'input'
                    },
                    placeholder: "Enter customer's name",
                    name: 'customerName',
                    underneathText:
                      'This customer will be added to your contacts. You can edit this contact through details.'
                  }
                : isCustomerInContacts == 'Yes'
                ? {
                    label: 'Customer',
                    type: {
                      type: 'picker',
                      options: [
                        {
                          mainLabel: 'Anifowoshe Gbenga',
                          value: 'anifowoshe gbenga'
                        }
                      ]
                    },
                    name: 'customerName',
                    placeholder: 'Touch to select customer'
                  }
                : null
            ],
            buttonTitle: 'Done'
          }
        ]}
        onCompleteSteps={() => null}
      />
    )
  }
}
