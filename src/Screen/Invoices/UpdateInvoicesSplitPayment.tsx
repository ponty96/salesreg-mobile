import React from 'react'
import FormStepperContainer from '../../Container/Form/StepperContainer'
import { Mutation } from 'react-apollo'
import { parseFieldErrors } from '../../Functions'
import AppSpinner from '../../Components/Spinner'
import { UserContext } from '../../context/UserContext'
import { UpdateInvoice } from '../../graphql/mutations/order'
import moment from 'moment'
import {
  ListCompanySalesGQL,
  ListCompanyInvoicesGQL
} from '../../graphql/queries/order'
import { NavigationActions } from 'react-navigation'
import { NotificationBanner } from '../../Components/NotificationBanner'
import configureNotificationBanner from '../../Functions/configureNotificationBanner'

interface IProps {
  user?: any
  navigation?: any
  setNotificationBanner: (obj: any) => void
}

interface IState {
  dueDate?: string
  allowsSplitPayment: string
  fieldErrors?: any
}

class UpdateInvoicesSplitPayment extends React.PureComponent<IProps, IState> {
  static navigationOptions = {
    header: null
  }

  state = {
    dueDate: moment(this.props.navigation.state.params.invoice.dueDate).format(
      'YYYY-MM-DD'
    ),
    allowsSplitPayment: this.props.navigation.state.params.invoice
      .allowsSplitPayment
      ? 'Yes'
      : 'No',
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

    let banner = NotificationBanner(
      configureNotificationBanner('UpdateInvoicesSplitPayment', {
        allowsSplitPayment:
          this.state.allowsSplitPayment == 'Yes' ? true : false
      })
    )
    banner.show({ bannerPosition: 'bottom' })

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
      invoice: {
        dueDate: this.state.dueDate,
        allowsSplitPayment:
          this.state.allowsSplitPayment == 'Yes' ? true : false
      }
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
                    stepTitle: "Let's allow part payment on this invoice?",
                    formFields: [
                      {
                        label:
                          'Do you want to allow part payment on this invoice?',
                        name: 'allowsSplitPayment',
                        placeholder: 'e.g no',
                        validators: ['required'],
                        type: {
                          type: 'radio',
                          options: ['Yes', 'No']
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
    {({ user }) => <UpdateInvoicesSplitPayment {...props} user={user} />}
  </UserContext.Consumer>
)

_UpdateInvoiceDueDate.navigationOptions =
  UpdateInvoicesSplitPayment.navigationOptions

export default _UpdateInvoiceDueDate
