import React from 'react'
import FormStepperContainer from '../../../Container/Form/StepperContainer'
import { UserContext } from '../../../context/UserContext'
import AppSpinner from '../../../Components/Spinner'
import { Mutation } from 'react-apollo'
import { parseFieldErrors } from '../../../Functions'
import { NavigationActions } from 'react-navigation'
import { NotificationContext } from '../../../context/NotificationContext'
import configureNotificationBanner from '../../../Functions/configureNotificationBanner'
import { UpsertLegalDocument } from '../../../graphql/mutations/business'
import {
  LegalDocuments,
  PolicyDocuments,
  TermsDocuments
} from '../../../utilities/data/picker-lists'

interface IProps {
  navigation: any
  user?: any
  setNotificationBanner?: (obj?: any) => void
}

interface IState {
  type: string
  name: string
  pdfUrl: string
  fieldErrors: any
}

class UpsertDocuments extends React.PureComponent<IProps, IState> {
  static navigationOptions = {
    header: null
  }

  state = {
    fieldErrors: {},
    type: 'policy',
    name: '',
    pdfUrl: ''
  }

  updateState = (key: string, val: string) => {
    const formData = {
      ...this.state,
      [key]: val
    }

    this.setState({
      ...formData
    })
  }

  parseMutationVariables = () => {
    let {
        navigation: {
          state: { params }
        }
      } = this.props,
      legalDocumentId = params && params.legalDocumentId,
      _params = legalDocumentId ? { legalDocumentId } : {}

    return {
      ..._params,
      legalDocument: {
        companyId: this.props.user.company.id,
        name: this.state.name,
        type: this.state.type.toUpperCase(),
        pdfUrl: this.state.pdfUrl
      }
    }
  }

  navigateUser = () => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: 'ProfileSettings'
        }),
        NavigationActions.navigate({
          routeName: 'WebstoreOptions'
        })
      ]
    })
    this.props.setNotificationBanner(
      configureNotificationBanner('UpdateLegalDocument', {
        name: `${this.state.name} ${
          this.state.type == 'policy' ? 'Policy' : ''
        }`
      })
    )
    this.props.navigation.dispatch(resetAction)
  }

  onCompleted = async res => {
    const {
      upsertLegalDocument: { success, fieldErrors }
    } = res

    if (!success) {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    } else {
      this.navigateUser()
    }
  }

  render() {
    return (
      <Mutation mutation={UpsertLegalDocument} onCompleted={this.onCompleted}>
        {(upsertLegalDocuments, { loading }) => {
          return (
            <React.Fragment>
              <AppSpinner visible={loading} />
              <FormStepperContainer
                fieldErrors={this.state.fieldErrors}
                scrollEnabled={false}
                handleBackPress={() => this.props.navigation.goBack()}
                formData={this.state}
                updateValueChange={this.updateState}
                onCompleteSteps={() =>
                  upsertLegalDocuments({
                    variables: this.parseMutationVariables()
                  })
                }
                steps={[
                  {
                    stepTitle: 'Add legal documents to your account',
                    formFields: [
                      {
                        label: 'Select a document type',
                        validators: ['required'],
                        name: 'type',
                        type: {
                          type: 'picker',
                          options: LegalDocuments
                        }
                      },
                      {
                        label: `Select a category for ${this.state.type}`,
                        validators: ['required'],
                        name: 'name',
                        type: {
                          type: 'picker',
                          options:
                            this.state.type == 'policy'
                              ? PolicyDocuments
                              : TermsDocuments
                        }
                      }
                    ]
                  },
                  {
                    stepTitle: `Upload your ${this.state.name} ${
                      this.state.type == 'policy' ? 'Policy' : ''
                    }`,
                    formFields: [
                      {
                        label: '',
                        validators: ['required'],
                        name: 'pdfUrl',
                        type: {
                          type: 'document-upload'
                        },
                        underneathText:
                          'This document is an important document showing legal bindings between your business and customers'
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

const _UpsertDocuments: any = props => (
  <UserContext.Consumer>
    {({ user }) => (
      <NotificationContext.Consumer>
        {({ setNotificationBanner }) => (
          <UpsertDocuments
            {...props}
            user={user}
            setNotificationBanner={setNotificationBanner}
          />
        )}
      </NotificationContext.Consumer>
    )}
  </UserContext.Consumer>
)

_UpsertDocuments.navigationOptions = UpsertDocuments.navigationOptions

export default _UpsertDocuments
