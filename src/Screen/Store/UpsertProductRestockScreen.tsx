import React from 'react'
import FormStepperContainer from '../../Container/Form/StepperContainer'
import { Mutation } from 'react-apollo'
import AppSpinner from '../../Components/Spinner'
import { parseFieldErrors } from '../../Functions'
import { UserContext } from '../../context/UserContext'
import { RestockProducts } from '../../graphql/mutations/store'
import { ListCompanyProductsGQL } from '../../graphql/queries/store'

interface IProps {
  navigation: any
  user?: any
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
      this.props.navigation.navigate('Products')
    }
  }

  parseMutationVariables = () => {
    let { items } = this.state,
      params = items.map(item => {
        let newItems = { ...item }

        delete newItems.name

        return newItems
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
