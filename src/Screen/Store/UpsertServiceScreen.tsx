import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { UpsertServiceGQL } from '../../graphql/mutations/store'
import { ListCompanyServicesGQL } from '../../graphql/queries/store'
import AppSpinner from '../../Components/Spinner'
import { parseFieldErrors } from '../../Functions'
import FormStepperContainer from '../../Container/Form/StepperContainer'
import {
  renderCategoryStep,
  renderTagStep,
  renderFeaturedImageStep,
  renderMediaStep
} from './utilities/productCreateSteps'
import { UserContext } from '../../context/UserContext'

interface IProps {
  navigation: any
  screenProps: any
  user: any
}

interface IState {
  name: string
  price: any
  description: string
  userId: string
  featuredImage: any
  images: string[]
  companyId: string
  fieldErrors: any
  categories: string[]
  tags: string[]
  isTopRatedByMerchant: any
  isFeatured: any
}

class UpsertServiceScreen extends Component<IProps, IState> {
  state = {
    name: '',
    price: 0,
    userId: this.props.user.id,
    description: '',
    featuredImage: '',
    images: [],
    companyId: this.props.user.company.id,
    fieldErrors: null,
    categories: [],
    tags: [],
    isTopRatedByMerchant: null,
    isFeatured: null
  }

  updateState = (key: string, value: any) => {
    const state = { ...this.state, [key]: value }
    this.setState(state)
  }

  componentDidMount() {
    const service = this.props.navigation.getParam('service', null)
    const { user } = this.props

    if (service) {
      this.setState({
        ...service,
        tags: service.tags.map(tag => tag.name),
        isTopRatedByMerchant:
          service.isTopRatedByMerchant == false ? 'no' : 'yes',
        isFeatured: service.isFeatured == false ? 'no' : 'yes',
        userId: user.id,
        companyId: user.company.id
      })
    }
  }

  render() {
    const { navigation } = this.props

    return (
      <Mutation
        mutation={UpsertServiceGQL}
        onCompleted={this.onCompleted}
        refetchQueries={[
          {
            query: ListCompanyServicesGQL,
            variables: {
              companyId: this.state.companyId,
              first: 10,
              after: null
            }
          }
        ]}
        awaitRefetchQueries={true}
      >
        {(upsertService, { loading }) => [
          <AppSpinner visible={loading} key="upsertservice-#1" />,
          <FormStepperContainer
            key="upsertservice-#2"
            formData={this.state}
            updateValueChange={this.updateState}
            fieldErrors={this.state.fieldErrors}
            handleBackPress={() => navigation.goBack()}
            onCompleteSteps={() =>
              upsertService({ variables: this.parseMutationVariables() })
            }
            steps={[
              {
                stepTitle: 'Tell us about this service',
                formFields: [
                  {
                    label: 'Name',
                    placeholder: 'e.g Ladies frontal makeup',
                    name: 'name',
                    validators: ['required'],
                    type: {
                      type: 'input'
                    }
                  },
                  {
                    label: 'Price',
                    placeholder: 'e.g 5000',
                    name: 'price',
                    validators: ['required'],
                    type: {
                      type: 'input',
                      keyboardType: 'numeric'
                    }
                  },
                  {
                    label: 'Description',
                    placeholder: 'e.g Ladies frontal makeup',
                    name: 'description',
                    type: {
                      type: 'input',
                      multiline: true
                    }
                  }
                ]
              },
              renderCategoryStep('service'),
              renderTagStep(this.state.name, 'service'),
              renderFeaturedImageStep(this.state.name),
              renderMediaStep(this.state.name)
            ]}
          />
        ]}
      </Mutation>
    )
  }

  parseMutationVariables = () => {
    const service = this.props.navigation.getParam('service', {})
    let params = {
      ...this.state,
      isTopRatedByMerchant:
        this.state.isTopRatedByMerchant == 'no' ? false : true,
      isFeatured: this.state.isFeatured == 'no' ? false : true,
      categories: this.state.categories.map(cat => cat.id)
    }
    delete params.fieldErrors
    delete params['__typename']
    delete params['id']
    delete params['totalTimesOrdered']


    return {
      service: params,
      serviceId: service ? service.id : null
    }
  }

  onCompleted = async res => {
    const {
      upsertService: { success, fieldErrors }
    } = res
    if (success) {
      this.props.navigation.navigate('Services')
    } else {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    }
  }
}

const _UpsertServiceScreen: any = props => (
  <UserContext.Consumer>
    {({ user }) => <UpsertServiceScreen {...props} user={user} />}
  </UserContext.Consumer>
)

_UpsertServiceScreen.navigationOptions = {
  header: null
}
export default _UpsertServiceScreen
