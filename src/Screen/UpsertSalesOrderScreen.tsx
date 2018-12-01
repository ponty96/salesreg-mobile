import React from 'react'
import FormStepperContainer from '../Container/Form/StepperContainer'

interface IProps {
  navigation: any
}

interface IState {
  salesItems: any[]
  fieldErrors: any
  paymentMethod: string
  customerName: string
  isCustomerInContacts: any
  discount: string
  amountPayable: string
  tax: string
}

export default class UpsertSalesOrderScreen extends React.PureComponent<
  IProps,
  IState
> {
  static navigationOptions = {
    header: null
  }

  state = {
    salesItems: [
      {
        selectedItem: { id: '', name: '', price: '0.00', sku: '', type: '' },
        quantity: ''
      }
    ],
    fieldErrors: null,
    isCustomerInContacts: null,
    paymentMethod: '',
    amountPayable: '0.00',
    discount: '0',
    customerName: '',
    tax: ''
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
                  type: 'sales-order-items'
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
            ]
          },
          {
            stepTitle: 'Payment Method',
            formFields: [
              {
                label: 'How is this customer paying?',
                type: {
                  type: 'radio',
                  options: ['Card', 'Cash']
                },
                name: 'paymentMethod'
              },
              {
                label: 'Are you giving discounts?',
                type: {
                  type: 'input',
                  keyboardType: 'numeric'
                },
                placeholder: '0',
                name: 'discount',
                underneathText: 'Ignore if there are no discounts.'
              },
              {
                label: 'Tax on this payment(%)',
                type: {
                  type: 'input',
                  keyboardType: 'numeric'
                },
                placeholder: '0.00',
                name: 'tax',
                underneathText: 'Ignore if there are no taxes on this payment'
              }
            ]
          },
          {
            stepTitle: 'Lets sort out the payment for this order',
            formFields: [
              {
                label: 'How much(N) was actually paid?',
                type: {
                  type: 'input',
                  keyboardType: 'numeric'
                },
                placeholder: '0.00',
                name: 'amountPayable'
              }
            ],
            buttonTitle: 'Done'
          }
        ]}
        onCompleteSteps={() => null}
      />
    )
  }
}
