import React, { PureComponent } from 'react'
import { Mutation } from 'react-apollo'
import { NavigationActions } from 'react-navigation'

import AppSpinner from '../../Components/Spinner'
import { parseFieldErrors } from '../../Functions'
import FormStepperContainer from '../../Container/Form/StepperContainer'
import { ListCompanyProductsGQL } from '../../graphql/queries/store'
import { UpdateProductGroupOptionsGQL } from '../../graphql/mutations/store'
import { UserContext } from '../../context/UserContext'
import { SearchOptionsByNameGQL } from '../../graphql/queries/store'
import { NotificationBanner } from '../../Components/NotificationBanner'
import configureNotificationBanner from '../../Functions/configureNotificationBanner'

interface IProps {
  navigation: any
  screenProps: any
  user: any
  setNotificationBanner: (obj: any) => void
}

interface IState {
  id: string
  options: any[]
  name: string
  fieldErrors: any
}

class UpdateProductGroupOptionsScreen extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      options: [],
      id: '',
      name: '',
      fieldErrors: null
    }
  }

  updateState = (key: string, value: any) => {
    const state = { ...this.state, [key]: value }
    this.setState(state)
  }

  componentDidMount() {
    const { productGroup } = this.props.navigation.getParam('product')
    this.setState({
      id: productGroup.id,
      options: productGroup.options,
      name: productGroup.title
    })
  }

  render() {
    return (
      <Mutation
        mutation={UpdateProductGroupOptionsGQL}
        onCompleted={this.onCompleted}
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
      >
        {(updateProductGroupOptions, { loading }) => [
          [
            <AppSpinner
              visible={loading}
              key="updateProductGroupOptions-1345"
            />,
            <FormStepperContainer
              formData={this.state}
              formAction="update"
              updateValueChange={this.updateState}
              fieldErrors={this.state.fieldErrors}
              handleBackPress={() => this.props.navigation.goBack()}
              onCompleteSteps={() => {
                updateProductGroupOptions({
                  variables: this.parseMutationVariables()
                })
              }}
              steps={[
                {
                  stepTitle: `Update the variant options for ${
                    this.state.name
                  }`,
                  stepHint: `Variant options are what makes one ${
                    this.state.name
                  } different from another ${
                    this.state.name
                  }. E.g. color, sizes`,
                  formFields: [
                    {
                      label: 'Select options',
                      type: {
                        type: 'search-multi-picker',
                        searchQuery: SearchOptionsByNameGQL,
                        emptySection: {
                          emptyText:
                            'You currently do not have any options, please create a new variant option'
                        },
                        searchQueryResponseKey: 'searchOptionsByName'
                      },
                      name: 'options'
                    }
                  ],
                  buttonTitle: 'Done'
                }
              ]}
              key="updateProductGroupOptions-1996"
            />
          ]
        ]}
      </Mutation>
    )
  }

  parseMutationVariables = () => {
    return {
      productGroupId: this.state.id,
      options: this.state.options.map(option => option.id)
    }
  }

  handleNavigation = products => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: 'Products'
        }),
        NavigationActions.navigate({
          routeName: `ProductDetails`,
          params: products
        })
      ]
    })

    let banner = NotificationBanner(
      configureNotificationBanner('UpdateProductGroupOptions', this.state)
    )
    banner.show({ bannerPosition: 'bottom' })

    this.props.navigation.dispatch(resetAction)
  }

  onCompleted = async res => {
    const {
      updateProductGroupOptions: { success, fieldErrors, data }
    } = res
    const product = this.props.navigation.getParam('product')

    let optObj = product.optionValues.reduce((acc, v) => {
      acc[v.option.name.toLowerCase()] = v.name
      return acc
    }, {})

    if (success) {
      let _product = {
        ...product,
        optionValues: this.state.options.map(opt => ({
          name:
            opt.optionName.toLowerCase() in optObj
              ? optObj[opt.optionName.toLowerCase()]
              : null,
          id: opt.id,
          option: {
            id: opt.id,
            name: opt.optionName
          }
        })),
        productGroup: data
      }
      this.handleNavigation({ product: _product })
    } else {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    }
  }
}

const _UpdateProductGroupOptionsScreen: any = props => (
  <UserContext.Consumer>
    {({ user }) => <UpdateProductGroupOptionsScreen {...props} user={user} />}
  </UserContext.Consumer>
)

_UpdateProductGroupOptionsScreen.navigationOptions = {
  header: null
}

export default _UpdateProductGroupOptionsScreen
