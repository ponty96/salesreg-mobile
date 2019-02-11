import React from 'react'
import { Mutation } from 'react-apollo'

import ProgressTracker from '../../Container/ProgressTracker'
import { NG_Banks } from '../../utilities/data/picker-lists'
import { parseFieldErrors } from '../../Functions'
import AppSpinner from '../../Components/Spinner'
import {
  UpdateCompanyGQL,
  UpdateCompanyCoverPhotoGQL
} from '../../graphql/mutations/business'
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
}

interface IProps {
  user?: any
  resetUserContext?: (obj: any) => void
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
    isPrimary: '',
    headOffice: {}
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
      this.props.resetUserContext(updatedUser)
      this.progressTracker.canGoForward() && this.progressTracker.gotoNext()
    }
  }

  parseCoverPhotoMutationVariables = () => {
    let params = { ...this.state }
    delete params.fieldErrors
    delete params.bankName
    delete params.accountNumber
    delete params.isPrimary
    delete params.headOffice
    return {
      coverPhoto: {
        companyId: this.props.user.company.id,
        coverPhoto: this.state.coverPhoto
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

    return {
      companyId: this.props.user.company.id,
      company: {
        contactEmail: this.props.user.company.contactEmail,
        currency: this.props.user.company.currency,
        title: this.props.user.company.title,
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
              <React.Fragment>
                <AppSpinner visible={socialLoading || coverLoading} />
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
                      onSave: () => null
                    }
                  ]}
                  onCompleteSteps={() => null}
                />
              </React.Fragment>
            )}
          </Mutation>
        )}
      </Mutation>
    )
  }
}

const _GettingStarted = props => (
  <UserContext.Consumer>
    {({ user, resetUserContext }) => (
      <GettingStarted
        {...props}
        user={user}
        resetUserContext={resetUserContext}
      />
    )}
  </UserContext.Consumer>
)

export default _GettingStarted
