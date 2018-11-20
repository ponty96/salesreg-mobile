import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { UpsertServiceGQL } from '../../graphql/mutations/store'
import AppSpinner from '../../Components/Spinner'
import { parseFieldErrors } from '../../Functions'
import FormStepperContainer from '../../Container/Form/StepperContainer'
import { ListCompanyCategoriesGQL } from '../../graphql/queries/store'
import { UserContext } from '../../context/UserContext'

interface IProps {
  navigation: any
  screenProps: any
  user: any
}

interface IState {
  name: string
  price: string
  description: string
  userId: string
  featuredImage: any
  images: string[]
  companyId: string
  fieldErrors: any
  listOfCategories: any
  categories: string[]
  tags: string[]
}

class UpsertServiceScreen extends Component<IProps, IState> {
  state = {
    name: '',
    price: '',
    userId: '',
    description: '',
    featuredImage: [
      'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7'
    ],
    images: [],
    companyId: '',
    fieldErrors: null,
    listOfCategories: [],
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

  updateDetails = () => {
    const { user } = this.props
    this.setState({
      userId: user.id,
      companyId: user.company.id
    })
  }

  async componentDidUpdate() {
    if (this.state.companyId && this.state.listOfCategories.length <= 0) {
      const {
        screenProps: { client }
      } = this.props
      const {
        data: { listCompanyCategories }
      } = await client.query({
        query: ListCompanyCategoriesGQL,
        variables: { companyId: this.state.companyId }
      })

      const categories = listCompanyCategories.map(category => ({
        mainLabel: category.title,
        value: category.id
      }))
      this.setState({ listOfCategories: categories })
    }
  }

  render() {
    const { navigation } = this.props
    return (
      <Mutation mutation={UpsertServiceGQL} onCompleted={this.onCompleted}>
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
              },
              {
                stepTitle: 'Categorize this service',
                formFields: [
                  {
                    label: 'Categories',
                    type: {
                      type: 'multi-picker',
                      options: this.state.listOfCategories
                    },
                    name: 'categories'
                  }
                ]
              },
              {
                stepTitle: `Add tags to ${this.state.name}`,
                stepHint:
                  ' \nTags will enhance your filters and your customer abilities to find services within select tags',
                formFields: [
                  { label: 'Tags', type: { type: 'tag-input' }, name: 'tags' }
                ]
              },
              {
                stepTitle: `Lets add images for ${
                  this.state.name
                } starting from the landing images`,
                stepHint: `The landing images is what your customers see displayed on catalogue page of webstore. This is the image of this service that your customers will first see when they explore your catalogue. Click + to add from your device storage`,
                formFields: [
                  {
                    label: '',
                    name: 'featuredImage',
                    type: {
                      type: 'image-upload'
                    }
                  }
                ]
              },
              {
                stepTitle: `Lets now add other images for ${this.state.name}`,
                stepHint: `Images will be displayed on the details section of your webstore. Customers can view multiple images of ${
                  this.state.name
                }`,
                formFields: [
                  {
                    label: '',
                    name: 'images',
                    type: {
                      type: 'image-upload'
                    }
                  }
                ],
                buttonTitle: 'Done'
              }
            ]}
          />
        ]}
      </Mutation>
    )
  }

  parseMutationVariables = () => {
    const service = this.props.navigation.getParam('service', {})
    let params = { ...this.state, featuredImage: this.state.featuredImage[0] }
    delete params.listOfCategories
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

const _UpsertServiceScreen = props => (
  <UserContext.Consumer>
    {user => <UpsertServiceScreen {...props} user={user} />}
  </UserContext.Consumer>
)

export default _UpsertServiceScreen
