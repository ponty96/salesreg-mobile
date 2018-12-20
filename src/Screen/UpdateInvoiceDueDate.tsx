import React from 'react'
import FormStepperContainer from '../Container/Form/StepperContainer'
import { Mutation } from 'react-apollo'
import { parseFieldErrors } from '../Functions'
import AppSpinner from '../Components/Spinner'
import { UserContext } from '../context/UserContext'
import { UpdateInvoice } from '../graphql/mutations/order'
import moment from 'moment'

interface IProps {
  user?: any
  navigation?: any
}

interface IState {
  dueDate?: string
  fieldErrors?: any
}

class UpdateInvoiceDueDate extends React.PureComponent<IProps, IState> {
  static navigationOptions = {
    header: null
  }

  state = {
    dueDate: moment(this.props.navigation.state.params.invoice.dueDate).format(
      'YYYY-MM-DD'
    ),
    fieldErrors: null
  }

  updateState = (key: string, val: any) => {
    const formData = { ...this.state, [key]: val }
    this.setState({ ...formData })
  }

  parseMutationVariables = () => {
    let {
      navigation: {
        state: {
          params: {
            invoice: { id }
          }
        }
      }
    } = this.props

    return {
      invoiceId: id,
      invoice: { dueDate: this.state.dueDate }
    }
  }

  onCompleted = async res => {
    const {
      updateInvoice: { success, fieldErrors, data }
    } = res

    if (!success) {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    } else {
      this.props.navigation.navigate('InvoiceDetails', {
        sales: { ...data.sale, invoice: { ...data } }
      })
    }
  }

  render() {
    console.log(
      'moment(this.props.navigation.state.params.invoice.dueDate)',
      moment(this.props.navigation.state.params.invoice.dueDate).format(
        'YYYY-MM-DD'
      )
    )
    return (
      <Mutation mutation={UpdateInvoice} onCompleted={this.onCompleted}>
        {(updateInvoice, { loading }) => {
          return (
            <React.Fragment>
              <AppSpinner visible={loading} />
              <FormStepperContainer
                updateValueChange={this.updateState}
                handleBackPress={() => this.props.navigation.goBack()}
                formData={this.state}
                fieldErrors={this.state.fieldErrors}
                onCompleteSteps={() =>
                  updateInvoice({ variables: this.parseMutationVariables() })
                }
                steps={[
                  {
                    stepTitle: "Let's set a new invoice due date",
                    formFields: [
                      {
                        label: 'When do you want to extend the invoice to?',
                        name: 'dueDate',
                        placeholder: 'e.g 06/23/2018',
                        validators: ['required'],
                        type: {
                          type: 'date'
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

const _UpdateInvoiceDueDate: any = props => (
  <UserContext.Consumer>
    {({ user }) => <UpdateInvoiceDueDate {...props} user={user} />}
  </UserContext.Consumer>
)

_UpdateInvoiceDueDate.navigationOptions = UpdateInvoiceDueDate.navigationOptions

export default _UpdateInvoiceDueDate
