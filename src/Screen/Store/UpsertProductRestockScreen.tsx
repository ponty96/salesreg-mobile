import React from 'react'
import { Mutation } from 'react-apollo'

import FormStepperContainer from '../../Container/Form/StepperContainer'
import AppSpinner from '../../Components/Spinner'
import { parseFieldErrors } from '../../Functions'
import { UserContext } from '../../context/UserContext'
import { RestockProducts } from '../../graphql/mutations/store'
import { ListCompanyProductsGQL } from '../../graphql/queries/store'
import { NotificationBanner } from '../../Components/NotificationBanner'
import configureNotificationBanner from '../../Functions/configureNotificationBanner'

interface IProps {
  navigation: any
  user?: any
  setNotificationBanner: (obj: any) => void
}

interface IProducts {
  id?: string
  quantity: String
  name?: string
}

interface IState {
  items: IProducts[]
  fieldErrors: any
}

class UpsertProductRestockScreen extends React.PureComponent<IProps, IState> {
  state = {
    items: [
      {
        quantity: '',
        name: '',
        id: ''
      }
    ],
    fieldErrors: null
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

  onCompleted = async res => {
    const {
      restockProducts: { success, fieldErrors }
    } = res

    if (!success) {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    } else {
      let banner = NotificationBanner(
        configureNotificationBanner('UpsertProductRestock')
      )
      banner.show({ bannerPosition: 'bottom' })

      this.props.navigation.navigate('Products')
    }
  }

  parseMutationVariables = () => {
    let { items } = this.state,
      params = items.map(item => {
        let newItems = { ...item },
          id = newItems.id

        delete newItems.name
        delete newItems.id

        return { ...newItems, productId: id }
      })

    return {
      items: params
    }
  }

  render() {
    return (
      <Mutation
        mutation={RestockProducts}
        refetchQueries={[
          {
            query: ListCompanyProductsGQL,
            variables: {
              queryText: '',
              companyId: this.props.user.company.id,
              first: 10,
              after: null
            }
          }
        ]}
        awaitRefetchQueries={true}
        onCompleted={this.onCompleted}
      >
        {(restockProducts, { loading }) => {
          return (
            <React.Fragment>
              <AppSpinner visible={loading} />
              <FormStepperContainer
                formData={this.state}
                updateValueChange={this.updateState}
                handleBackPress={() => this.props.navigation.goBack()}
                fieldErrors={this.state.fieldErrors}
                onCompleteSteps={() =>
                  restockProducts({
                    variables: this.parseMutationVariables()
                  })
                }
                steps={[
                  {
                    stepTitle: "Let's have the items you are restocking",
                    formFields: [
                      {
                        label: '',
                        validators: ['sales-order'],
                        type: {
                          type: 'restock-items'
                        },
                        name: 'items'
                      }
                    ]
                  },
                  {
                    stepTitle: 'Verify your re-stock entry',
                    formFields: [
                      {
                        label: '',
                        type: {
                          type: 'product-list'
                        },
                        name: 'items'
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

const _UpsertProductRestockScreen: any = props => (
  <UserContext.Consumer>
    {({ user }) => <UpsertProductRestockScreen {...props} user={user} />}
  </UserContext.Consumer>
)

_UpsertProductRestockScreen.navigationOptions = {
  header: null
}

export default _UpsertProductRestockScreen
