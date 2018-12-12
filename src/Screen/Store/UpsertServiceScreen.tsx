import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { UpsertServiceGQL } from '../../graphql/mutations/store'
import { ListCompanyServicesGQL } from '../../graphql/queries/store'
import AppSpinner from '../../Components/Spinner'
import { parseFieldErrors } from '../../Functions'
import FormStepperContainer from '../../Container/Form/StepperContainer'
import Auth from '../../services/auth'
import {
  renderCategoryStep,
  renderTagStep,
  renderFeaturedImageStep,
  renderMediaStep
} from './utilities/productCreateSteps'

interface IProps {
  navigation: any
  screenProps: any
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
}

export default class UpsertServiceScreen extends Component<IProps, IState> {
  state = {
    name: '',
    price: 0,
    userId: '',
    description: '',
    featuredImage: '',
    images: [],
    companyId: '',
    fieldErrors: null,
    categories: [],
    tags: []
  }

  updateState = (key: string, value: any) => {
    const state = { ...this.state, [key]: value }
    this.setState(state)
  }

  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    const service = this.props.navigation.getParam('service', null)
    if (service) {
      this.setState({ ...service })
    }
    this.updateDetails()
  }

  updateDetails = async () => {
    const user = JSON.parse(await Auth.getCurrentUser())
    this.setState({
      userId: user.id,
      companyId: user.company.id
    })
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
    let params = { ...this.state }
    delete params.fieldErrors

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
