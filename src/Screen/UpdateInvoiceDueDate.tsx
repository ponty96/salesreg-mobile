import React from 'react'
import FormStepperContainer from '../Container/Form/StepperContainer'
import { Mutation } from 'react-apollo'
import { parseFieldErrors } from '../Functions'
import AppSpinner from '../Components/Spinner'
import { UserContext } from '../context/UserContext'
import { UpdateInvoice } from '../graphql/mutations/order'
import moment from 'moment'
import {
  ListCompanySalesGQL,
  ListCompanyInvoicesGQL
} from '../graphql/queries/order'
import { NavigationActions } from 'react-navigation'
import { NotificationContext } from '../context/NotificationContext'
import configureNotificationBanner from '../Functions/configureNotificationBanner'

interface IProps {
  user?: any
  navigation?: any
  setNotificationBanner: (obj: any) => void
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

  navigateUser = data => {
    const {
      navigation: {
        state: {
          params: { from }
        }
      }
    } = this.props

    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: from
        }),
        NavigationActions.navigate({
          routeName: 'InvoiceDetails',
          params: {
            sales: {
              ...data.sale,
              invoice: { ...data }
            },
            from
          }
        })
      ]
    })
    this.props.setNotificationBanner(
      configureNotificationBanner('UpdateInvoiceDueDate')
    )
    this.props.navigation.dispatch(resetAction)
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
      this.navigateUser(data)
    }
  }

  render() {
    return (
      <Mutation
        mutation={UpdateInvoice}
        refetchQueries={[
          {
            query: ListCompanySalesGQL,
            variables: {
              companyId: this.props.user.company.id,
              first: 10,
              after: null
            }
          },
          {
            query: ListCompanyInvoicesGQL,
            variables: {
              companyId: this.props.user.company.id,
              first: 10,
              after: null
            }
          }
        ]}
        awaitRefetchQueries={true}
        onCompleted={this.onCompleted}
      >
        {(updateInvoice, { loading }) => {
          return (
            <React.Fragment>
              <AppSpinner visible={loading} />
              <FormStepperContainer
                updateValueChange={this.updateState}
                formAction="update"
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
                          type: 'date',
                          minDate: new Date(),
                          maxDate: new Date('1 January 2030')
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
    {({ user }) => (
      <NotificationContext.Consumer>
        {({ setNotificationBanner }) => (
          <UpdateInvoiceDueDate
            {...props}
            user={user}
            setNotificationBanner={setNotificationBanner}
          />
        )}
      </NotificationContext.Consumer>
    )}
  </UserContext.Consumer>
)

_UpdateInvoiceDueDate.navigationOptions = UpdateInvoiceDueDate.navigationOptions

export default _UpdateInvoiceDueDate
