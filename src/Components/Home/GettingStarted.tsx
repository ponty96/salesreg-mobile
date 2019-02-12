import React from 'react'
import { Mutation } from 'react-apollo'
import { Alert } from 'react-native'

import ProgressTracker from '../../Container/ProgressTracker'
import { NG_Banks } from '../../utilities/data/picker-lists'
import { parseFieldErrors } from '../../Functions'
import AppSpinner from '../../Components/Spinner'
import {
  UpdateCompanyGQL,
  UpdateCompanyCoverPhotoGQL,
  UpsertBankGQL
} from '../../graphql/mutations/business'
import { ListCompanyBanksGQL } from '../../graphql/queries/business'
import Auth from '../../services/auth'
import { UserContext } from '../../context/UserContext'

interface IState {
  fieldErrors: any
  facebook: string
  instagram: string
  twitter: string
  coverPhoto: string
  bankName: string
  accountNumber: string
  isPrimary: string
  headOffice: any
  isVerifyingBankAccount: boolean
  hasBankAccountBeenVerified: boolean
}

interface IProps {
  user?: any
  resetUserContext?: (obj: any) => void
  resetGettingStartedProgress?: (obj: any) => void
  gettingStartedProgress?: any
  onDone: () => void
}

class GettingStarted extends React.PureComponent<IProps, IState> {
  private progressTracker: any

  state = {
    fieldErrors: null,
    facebook: '',
    instagram: '',
    twitter: '',
    coverPhoto: '',
    bankName: '',
    accountNumber: '',
    isPrimary: 'yes',
    headOffice: {},
    isVerifyingBankAccount: false,
    hasBankAccountBeenVerified: false
  }

  async componentDidMount() {
    let gettingStartedProgress = await Auth.gettingStartedProgress(),
      _currentStep = !gettingStartedProgress
        ? 1
        : Number(gettingStartedProgress)

    this.progressTracker.gotoNext(_currentStep)
  }

  updateState = (key: string, value: string) => {
    this.setState({
      ...this.state,
      [key]: value
    })
  }

  onCompleteSocialPhase = async res => {
    const {
      updateCompany: { success, fieldErrors, data }
    } = res
    if (success) {
      const updatedUser = { ...this.props.user, company: data }
      await Auth.setCurrentUser(updatedUser)
      await Auth.setGettingStartedProgress('2')

      this.props.resetGettingStartedProgress('2')
      this.props.resetUserContext(updatedUser)
      this.progressTracker.canGoForward() && this.progressTracker.gotoNext()
    } else {
      const parsedErrors = parseFieldErrors(fieldErrors)
      this.setState({
        fieldErrors: {
          ...parsedErrors
        }
      })
    }
  }

  onCompleteWebstorePhase = async res => {
    const {
      updateCompanyCoverPhoto: { success, fieldErrors, data }
    } = res
    if (!success) {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    } else {
      const updatedUser = {
        ...this.props.user,
        company: { ...this.props.user.company, coverPhoto: data.coverPhoto }
      }

      await Auth.setCurrentUser(updatedUser)
      await Auth.setGettingStartedProgress('3')

      this.props.resetGettingStartedProgress('3')
      this.props.resetUserContext(updatedUser)
      this.progressTracker.canGoForward() && this.progressTracker.gotoNext()
    }
  }

  onCompleteBankPhase = async res => {
    const {
      upsertBank: { success, fieldErrors, data }
    } = res

    if (!success) {
      setTimeout(() => {
        Alert.alert(
          'Error Occurred!!!',
          `${fieldErrors[0].message}`,
          [
            {
              text: 'Okay',
              onPress: () => null
            }
          ],
          { cancelable: false }
        )
      }, 100)
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    } else {
      let updatedUser = {
        ...this.props.user,
        company: { ...this.props.user.company, bank: data }
      }

      this.props.resetUserContext(updatedUser)
      this.props.resetGettingStartedProgress('done')
      await Auth.setCurrentUser(updatedUser)

      await Auth.setGettingStartedProgress('done')
      this.props.onDone()
    }
  }

  parseCoverPhotoMutationVariables = () => {
    let params = { ...this.state }
    delete params.fieldErrors
    delete params.bankName
    delete params.accountNumber
    delete params.isPrimary
    delete params.headOffice
    delete params.isVerifyingBankAccount
    delete params.hasBankAccountBeenVerified

    return {
      coverPhoto: {
        companyId: this.props.user.company.id,
        coverPhoto: this.state.coverPhoto
      }
    }
  }

  parseBankMutationVariables = () => {
    let params = { ...this.state }
    delete params.fieldErrors
    delete params.coverPhoto
    delete params.isVerifyingBankAccount
    delete params.hasBankAccountBeenVerified
    delete params.facebook
    delete params.twitter
    delete params.instagram
    delete params.headOffice

    return {
      bank: {
        ...params,
        bankCode: params.bankName,
        isPrimary: params.isPrimary == 'yes' ? true : false,
        companyId: this.props.user.company.id,
        accountName: this.props.user.company.title
      }
    }
  }

  parseSocialMutationVariables = () => {
    let params = { ...this.state }
    delete params.fieldErrors
    delete params.coverPhoto
    delete params.bankName
    delete params.accountNumber
    delete params.isPrimary
    delete params.isVerifyingBankAccount
    delete params.hasBankAccountBeenVerified

    return {
      companyId: this.props.user.company.id,
      company: {
        contactEmail: this.props.user.company.contactEmail,
        currency: this.props.user.company.currency,
        title: this.props.user.company.title,
        phone: {
          number: this.props.user.company.phone.number
        },
        slug: this.props.user.company.slug,
        ...params,
        headOffice: {
          street1: '***',
          city: '***',
          state: '***',
          country: '***'
        }
      }
    }
  }

  render() {
    return (
      <Mutation
        mutation={UpdateCompanyGQL}
        onCompleted={this.onCompleteSocialPhase}
      >
        {(updateCompany, { loading: socialLoading }) => (
          <Mutation
            mutation={UpdateCompanyCoverPhotoGQL}
            onCompleted={this.onCompleteWebstorePhase}
          >
            {(updateCoverPhoto, { loading: coverLoading }) => (
              <Mutation
                mutation={UpsertBankGQL}
                refetchQueries={[
                  {
                    query: ListCompanyBanksGQL,
                    variables: {
                      companyId:
                        this.props.user.company && this.props.user.company.id,
                      first: 10,
                      after: null
                    }
                  }
                ]}
                awaitRefetchQueries={true}
                onCompleted={this.onCompleteBankPhase}
              >
                {(upsertBank, { loading: bankLoading }) => (
                  <React.Fragment>
                    <AppSpinner
                      visible={
                        socialLoading ||
                        coverLoading ||
                        bankLoading ||
                        this.state.isVerifyingBankAccount
                      }
                    />
                    <ProgressTracker
                      title="Getting Started!"
                      formData={this.state}
                      setRef={progressTracker =>
                        (this.progressTracker = progressTracker)
                      }
                      updateValueChange={this.updateState}
                      fieldErrors={this.state.fieldErrors}
                      initialStep={0}
                      steps={[
                        {
                          stepTitle: 'Add social accounts',
                          stepHint:
                            'Link up your social accounts with your business',
                          formFields: [
                            {
                              label: 'Facebook username',
                              placeholder: 'e.g username',
                              type: {
                                type: 'input'
                              },
                              validators: ['required', 'social-media-username'],
                              name: 'facebook'
                            },
                            {
                              label: 'Instagram username',
                              placeholder: 'e.g username',
                              type: {
                                type: 'input'
                              },
                              validators: ['required', 'social-media-username'],
                              name: 'instagram'
                            },
                            {
                              label: 'Twitter username',
                              placeholder: 'e.g username',
                              type: {
                                type: 'input'
                              },
                              validators: ['required', 'social-media-username'],
                              name: 'twitter'
                            }
                          ],
                          onSave: () =>
                            updateCompany({
                              variables: this.parseSocialMutationVariables()
                            })
                        },
                        {
                          stepTitle: 'Manage your webstore',
                          stepHint: 'Add a cover photo to your webstore',
                          formFields: [
                            {
                              label: '',
                              validators: ['required'],
                              name: 'coverPhoto',
                              type: {
                                type: 'image-upload'
                              },
                              underneathText:
                                'This image will be used as the cover image for your webstore'
                            }
                          ],
                          onSave: () => {
                            updateCoverPhoto({
                              variables: this.parseCoverPhotoMutationVariables()
                            })
                          }
                        },
                        {
                          stepTitle: 'Linkup your bank account',
                          stepHint:
                            'Link up your primary bank account with your business so you can receive payments',
                          formFields: [
                            {
                              label: 'What corporate bank do you use?',
                              placeholder: 'Touch to choose',
                              type: {
                                type: 'picker',
                                options: NG_Banks
                              },
                              validators: ['required'],
                              name: 'bankName'
                            },
                            {
                              label: 'What is your bank account number?',
                              placeholder: 'Your bank issued account number',
                              type: {
                                type: 'input',
                                keyboardType: 'phone-pad'
                              },
                              validators: ['required'],
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
                          onSave: () =>
                            upsertBank({
                              variables: this.parseBankMutationVariables()
                            })
                        }
                      ]}
                      onCompleteSteps={() => null}
                    />
                  </React.Fragment>
                )}
              </Mutation>
            )}
          </Mutation>
        )}
      </Mutation>
    )
  }
}

const _GettingStarted = props => (
  <UserContext.Consumer>
    {({
      user,
      resetUserContext,
      resetGettingStartedProgress,
      gettingStartedProgress
    }) => (
      <GettingStarted
        {...props}
        user={user}
        resetUserContext={resetUserContext}
        gettingStartedProgress={gettingStartedProgress}
        resetGettingStartedProgress={resetGettingStartedProgress}
      />
    )}
  </UserContext.Consumer>
)

export default _GettingStarted
