import React, { PureComponent } from 'react'

import { Mutation } from 'react-apollo'
import AppSpinner from '../../Components/Spinner'
import { parseFieldErrors } from '../../Functions'
import FormStepperContainer from '../../Container/Form/StepperContainer'
import { ListCompanyProductsGQL } from '../../graphql/queries/store'
import { UpdateProductGroupOptionsGQL } from '../../graphql/mutations/store'
import { UserContext } from '../../context/UserContext'
import { SearchOptionsByNameGQL } from '../../graphql/queries/store'

interface IProps {
  navigation: any
  screenProps: any
  user: any
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

  onCompleted = async res => {
    const {
      updateProductGroupOptions: { success, fieldErrors }
    } = res
    if (success) {
      this.props.navigation.navigate('Products')
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
