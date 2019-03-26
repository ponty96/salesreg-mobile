import React from 'react'
import { Mutation } from 'react-apollo'
import { NavigationActions } from 'react-navigation'

import FormStepperContainer from '../../../Container/Form/StepperContainer'
import { UserContext } from '../../../context/UserContext'
import AppSpinner from '../../../Components/Spinner'
import { parseFieldErrors } from '../../../Functions'
import { NotificationBanner } from '../../../Components/NotificationBanner'
import configureNotificationBanner from '../../../Functions/configureNotificationBanner'
import { UpsertLegalDocument } from '../../../graphql/mutations/business'
import {
  LegalDocuments,
  PolicyDocuments,
  TermsDocuments
} from '../../../utilities/data/picker-lists'
import Auth from '../../../services/auth'

interface IProps {
  navigation: any
  user?: any
  resetUserContext?: (user?: any) => void
  setNotificationBanner?: (obj?: any) => void
}

interface IState {
  type: string
  name: string
  pdfUrl: string
  fieldErrors: any
}

class UpsertDocumentsScreen extends React.PureComponent<IProps, IState> {
  private addedPolicyDocumenents: string[]

  constructor(props) {
    super(props)
    let {
      user: {
        company: { legalDocuments }
      }
    } = this.props

    this.addedPolicyDocumenents = legalDocuments.map(doc => doc.name)
  }

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

  navigateUser = async data => {
    const user = JSON.parse(await Auth.getCurrentUser())
    const updatedUser = {
      ...user,
      company: { ...user.company, legalDocuments: data.legalDocuments }
    }

    await Auth.setCurrentUser(updatedUser)
    this.props.resetUserContext(updatedUser)

    const resetAction = NavigationActions.reset({
      index: 2,
      actions: [
        NavigationActions.navigate({
          routeName: 'ProfileSettings'
        }),
        NavigationActions.navigate({
          routeName: 'WebstoreOptions'
        }),
        NavigationActions.navigate({
          routeName: 'Documents'
        })
      ]
    })

    let banner = NotificationBanner(
      configureNotificationBanner('UpdateLegalDocument', {
        name: `${this.state.name} ${
          this.state.type == 'policy' ? 'Policy' : ''
        }`
      })
    )
    banner.show({ bannerPosition: 'bottom' })

    this.props.navigation.dispatch(resetAction)
  }

  onCompleted = res => {
    const {
      upsertLegalDocument: { success, fieldErrors, data }
    } = res

    if (!success) {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    } else {
      this.navigateUser(data)
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
                          emptySection: {
                            emptyText: `All the documents for ${
                              this.state.type
                            } has been provided`
                          },
                          options:
                            this.state.type == 'policy'
                              ? PolicyDocuments.filter(
                                  doc =>
                                    this.addedPolicyDocumenents.indexOf(
                                      doc.value
                                    ) == -1
                                )
                              : TermsDocuments.filter(
                                  doc =>
                                    this.addedPolicyDocumenents.indexOf(
                                      doc.value
                                    ) == -1
                                )
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

const _UpsertDocumentsScreen: any = props => (
  <UserContext.Consumer>
    {({ user, resetUserContext }) => (
      <UpsertDocumentsScreen
        {...props}
        user={user}
        resetUserContext={resetUserContext}
      />
    )}
  </UserContext.Consumer>
)

_UpsertDocumentsScreen.navigationOptions =
  UpsertDocumentsScreen.navigationOptions

export default _UpsertDocumentsScreen
