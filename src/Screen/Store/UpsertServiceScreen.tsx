import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { UpsertServiceGQL } from '../../graphql/mutations/store'
import AppSpinner from '../../Components/Spinner'
import Auth from '../../services/auth'
import { parseFieldErrors } from '../../Functions'
import FormStepperContainer from '../../Container/Form/StepperContainer'

interface IProps {
  navigation: any
  screenProps: any
}

interface IState {
  name: string
  price: string
  description: string
  userId: string
  featuredImage: string
  images: string[]
  companyId: string
  fieldErrors: any
}

export default class UpsertServiceScreen extends Component<IProps, IState> {
  state = {
    name: '',
    price: '',
    userId: '',
    description: '',
    featuredImage: '',
    images: [],
    companyId: '',
    fieldErrors: null
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
      <Mutation mutation={UpsertServiceGQL} onCompleted={this.onCompleted}>
        {(upsertService, { loading }) => [
          <AppSpinner visible={loading} />,
          <FormStepperContainer
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
                    type: {
                      type: 'input'
                    }
                  },
                  {
                    label: 'Price',
                    placeholder: 'e.g 5000',
                    name: 'price',
                    type: {
                      type: 'input'
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
              }
            ]}
          />
        ]}
      </Mutation>
    )
  }

  parseMutationVariables = () => {
    const service = this.props.navigation.getParam('service', {})
    const { name, price, userId, companyId } = this.state
    return {
      name,
      price,
      userId,
      companyId,
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
