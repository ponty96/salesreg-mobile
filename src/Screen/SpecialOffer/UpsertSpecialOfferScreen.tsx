import React from 'react'
import FormStepperContainer from '../../Container/Form/StepperContainer'
import { Mutation } from 'react-apollo'
import { NavigationActions } from 'react-navigation'

import AppSpinner from '../../Components/Spinner'
import { UpsertBonanza } from '../../graphql/mutations/offer'
import { ListCompanyBonanzasGQL } from '../../graphql/queries/offer'
import { parseFieldErrors } from '../../Functions'
import { NotificationBanner } from '../../Components/NotificationBanner'
import configureNotificationBanner from '../../Functions/configureNotificationBanner'
import { UserContext } from '../../context/UserContext'
import setAppAnalytics from '../../Functions/setAppAnalytics'

interface IProps {
  navigation: any
  setNotificationBanner: (obj: any) => void
  user?: any
}

interface IState {
  title: string
  description: string
  startDate: string
  endDate: string
  fieldErrors: any
  coverPhoto: string
  bonanzaItems: {
    maxQuantity: string
    priceSlashTo: string
    productId: string
  }[]
}

class UpsertSpecialOfferScreen extends React.PureComponent<IProps, IState> {
  static navigationOptions = {
    header: null
  }

  state = {
    title: '',
    startDate: '',
    endDate: '',
    description: '',
    coverPhoto: '',
    fieldErrors: null,
    bonanzaItems: [
      {
        maxQuantity: '',
        productId: null,
        priceSlashTo: '0.00'
      }
    ]
  }

  componentDidMount() {
    const specialOffer = this.props.navigation.getParam('specialOffer', {})
    if (specialOffer && Object.keys(specialOffer).length > 0) {
      this.setState({
        ...specialOffer,
        bonanzaItems: specialOffer.bonanzaItems.map(offer => ({
          maxQuantity: offer.maxQuantity,
          priceSlashTo: offer.priceSlashTo,
          name: offer.product.name,
          productId: offer.product.id
        }))
      })
    }
  }

  updateState = (key: string, val: any) => {
    const formData = {
      ...this.state,
      [key]: val
    }

    this.setState({
      ...formData
    })
  }

  navigateUser = data => {
    const specialOffer = this.props.navigation.getParam('specialOffer', {})
    setAppAnalytics('CREATE_SPECIAL_OFFER')
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: 'SpecialOffer'
        }),
        NavigationActions.navigate({
          routeName: 'SpecialOfferDetails',
          params: { specialOffer: data }
        })
      ]
    })

    let banner = NotificationBanner(
      configureNotificationBanner(
        specialOffer && Object.keys(specialOffer).length > 0
          ? 'UpdateSpecialOffer'
          : 'CreateSpecialOffer',
        data
      )
    )
    banner.show({ bannerPosition: 'bottom' })
    this.props.navigation.dispatch(resetAction)
  }

  onCompleted = async res => {
    const {
      upsertBonanza: { success, fieldErrors, data }
    } = res

    if (!success) {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    } else {
      this.navigateUser(data)
    }
  }

  parseMutationVariables = () => {
    let params: any = { ...this.state },
      {
        user: {
          id: userId,
          company: { id: companyId }
        }
      } = this.props,
      _bonanzas = {}

    delete params.fieldErrors
    if (params.id) {
      _bonanzas = { bonanzaId: params.id }
      delete params.id
      delete params.__typename
      delete params.date
    }

    return {
      ..._bonanzas,
      bonanza: {
        ...params,
        companyId,
        userId,
        bonanzaItems: params.bonanzaItems.map(offer => ({
          maxQuantity: offer.maxQuantity,
          productId: offer.productId,
          priceSlashTo: offer.priceSlashTo
        }))
      }
    }
  }

  render() {
    const specialOffer = this.props.navigation.getParam('specialOffer', {})

    let {
      user: {
        company: { id: companyId }
      }
    } = this.props
    return (
      <Mutation
        mutation={UpsertBonanza}
        refetchQueries={[
          {
            query: ListCompanyBonanzasGQL,
            variables: {
              companyId,
              first: 10,
              after: null
            }
          }
        ]}
        awaitRefetchQueries={true}
        onCompleted={this.onCompleted}
      >
        {(upsertOffer, { loading }) => (
          <React.Fragment>
            <AppSpinner visible={loading} />
            <FormStepperContainer
              formAction={Object.keys(specialOffer).length > 0 && 'update'}
              formData={this.state}
              updateValueChange={this.updateState}
              handleBackPress={() => this.props.navigation.goBack()}
              fieldErrors={this.state.fieldErrors}
              onCompleteSteps={() =>
                upsertOffer({ variables: this.parseMutationVariables() })
              }
              steps={[
                {
                  stepTitle: 'Basic Details for Special Offer',
                  formFields: [
                    {
                      label: 'Give this offer a title',
                      validators: ['required'],
                      type: {
                        type: 'input'
                      },
                      name: 'title'
                    },
                    {
                      label: 'Give this offer a start date',
                      name: 'startDate',
                      placeholder: 'e.g 24/03/2019',
                      validators: ['required'],
                      type: {
                        type: 'date',
                        minDate: new Date(),
                        maxDate: new Date('1 January 2030')
                      }
                    },
                    {
                      label: 'Give this offer an end date',
                      name: 'endDate',
                      placeholder: 'e.g 27/03/2019',
                      validators: ['required'],
                      type: {
                        type: 'date',
                        minDate: new Date(),
                        maxDate: new Date('1 January 2030')
                      }
                    },
                    {
                      label: 'Give this offer a description',
                      type: {
                        type: 'input',
                        keyboardType: 'default',
                        multiline: true
                      },
                      name: 'description'
                    }
                  ]
                },
                {
                  stepTitle: "Let's have the items that belongs to this offer",
                  formFields: [
                    {
                      label: '',
                      validators: ['special-offer'],
                      type: {
                        type: 'special-offer-items'
                      },
                      name: 'bonanzaItems'
                    }
                  ]
                },
                {
                  stepTitle: 'You will need a cover image(2000*560)',
                  formFields: [
                    {
                      label: '',
                      name: 'coverPhoto',
                      type: {
                        type: 'image-upload'
                      },
                      underneathText:
                        'This image will be used as the cover/main image for the special offer'
                    }
                  ],
                  buttonTitle: 'Done'
                }
              ]}
            />
          </React.Fragment>
        )}
      </Mutation>
    )
  }
}

const _UpsertSpecialOfferScreen: any = props => (
  <UserContext.Consumer>
    {({ user }) => <UpsertSpecialOfferScreen {...props} user={user} />}
  </UserContext.Consumer>
)

_UpsertSpecialOfferScreen.navigationOptions =
  UpsertSpecialOfferScreen.navigationOptions

export default _UpsertSpecialOfferScreen
