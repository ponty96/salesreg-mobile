import React, { PureComponent } from 'react'

import { Mutation } from 'react-apollo'
import AppSpinner from '../../Components/Spinner'
import { parseFieldErrors } from '../../Functions'
import FormStepperContainer, {
  FormStep
} from '../../Container/Form/StepperContainer'
import { ListCompanyProductsGQL } from '../../graphql/queries/store'
import { UpdateProductGQL } from '../../graphql/mutations/store'
import {
  renderCategoryStep,
  renderFeaturedImageStep,
  renderOptionValuesInputStep,
  renderMediaStep,
  renderProductDescriptionStep,
  renderTagStep
} from './utilities/productCreateSteps'

import { UserContext } from '../../context/UserContext'

interface IProps {
  navigation: any
  screenProps: any
  user: any
}

interface OptionValue {
  optionId: string
  name: string
  optionName: string
}

interface IState {
  sku: string | number
  minimumSku: string | number
  price: string | number
  featuredImage: string
  images: any[]
  name: string
  optionValues: OptionValue[]
  description: string
  categories: any[]
  tags: any[]
  isTopRatedByMerchant: any
  isFeatured: any
  companyId: string
  userId: string
  currentFormState: string
  id: string
  fieldErrors: any
}

class UpdateProductScreen extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      sku: 0,
      minimumSku: 0,
      price: '',
      featuredImage:
        'https://cdn2.jomashop.com/media/catalog/product/cache/1/watermark/490x490/0a1186946c551c1cc1f1a1120b7bd9a0/h/u/hublot-big-bang-mens-watch-301.px.130.rx.174.jpg',
      images: [],
      name: '',
      optionValues: [],
      description: '',
      categories: [],
      isTopRatedByMerchant: null,
      isFeatured: null,
      tags: [],
      userId: '',
      companyId: '',
      id: null,
      currentFormState: '',
      fieldErrors: null
    }
  }

  componentDidMount() {
    this.updateDetails()
  }

  updateDetails = async () => {
    const { user } = this.props
    const product = this.props.navigation.getParam('product', null)
    this.setState({
      userId: user.id,
      companyId: user.company.id,
      ...product,
      tags: product.tags.map(tag => tag.name),
      isTopRatedByMerchant:
        product.isTopRatedByMerchant == false ? 'no' : 'yes',
      isFeatured: product.isFeatured == false ? 'no' : 'yes',
      sku: product.number,
      optionValues: this.parseOptionValuesForForm(product)
    })
  }

  updateState = (key: string, value: any) => {
    if (key.indexOf('option-') == 0) {
      this.updateOptionValues(key, value)
    } else {
      const state = { ...this.state, [key]: value }
      this.setState(state)
    }
  }

  parseOptionValuesForForm = ({ optionValues = [] }) => {
    return optionValues.map(optionValue => ({
      name: optionValue.name,
      optionId: optionValue.option.id,
      optionName: optionValue.option.name
    }))
  }

  updateOptionValues = (key, val) => {
    const optionId = key.substr(7)
    const optionValues = this.state.optionValues.map(optionValue => {
      if (optionValue.optionId == optionId) {
        return {
          ...optionValue,
          name: val
        }
      }
      return optionValue
    })
    this.setState({ optionValues })
  }

  render() {
    return (
      <Mutation
        mutation={UpdateProductGQL}
        onCompleted={this.onCompleted}
        refetchQueries={[
          {
            query: ListCompanyProductsGQL,
            variables: {
              companyId: this.state.companyId,
              first: 10,
              after: null
            }
          }
        ]}
        awaitRefetchQueries={true}
      >
        {(updateProduct, { loading }) => [
          [
            <AppSpinner visible={loading} key="updateProduct-1345" />,
            <FormStepperContainer
              formData={this.state}
              updateValueChange={this.updateState}
              fieldErrors={this.state.fieldErrors}
              handleBackPress={() => this.props.navigation.goBack()}
              onCompleteSteps={() => {
                updateProduct({ variables: this.parseMutationVariables() })
              }}
              steps={this.parseFormSteps()}
              key="updateProduct-1996"
            />
          ]
        ]}
      </Mutation>
    )
  }

  parseFormSteps = (): FormStep[] => {
    return [
      {
        stepTitle: 'Name this product?',
        formFields: [
          {
            label: 'Product name',
            placeholder: 'e.g Leather Shoe',
            name: 'name',
            type: {
              type: 'input'
            }
          }
        ]
      },
      this.getSecondStep(),
      this.getThirdStep(),
      this.getFourthStep(),
      this.getFifthStep(),
      this.getSixthStep(),
      this.getSeventhStep()
    ]
  }

  getSecondStep = (): FormStep | any => {
    if (this.state.optionValues.length > 0) {
      return renderOptionValuesInputStep(
        this.state.optionValues,
        this.state.name
      )
    } else {
      return renderProductDescriptionStep(this.state.name)
    }
  }

  getThirdStep = (): FormStep | any => {
    if (this.state.optionValues.length > 0) {
      return renderProductDescriptionStep(this.state.name)
    } else {
      return renderCategoryStep('product')
    }
  }

  getFourthStep = (): FormStep | any => {
    if (this.state.optionValues.length > 0) {
      return renderCategoryStep('product')
    } else {
      return renderTagStep(this.state.name, 'product')
    }
  }

  getFifthStep = (): FormStep | any => {
    if (this.state.optionValues.length > 0) {
      return renderTagStep(this.state.name, 'product')
    } else {
      return renderFeaturedImageStep(this.state.name)
    }
  }

  getSixthStep = (): FormStep | any => {
    if (this.state.optionValues.length > 0) {
      return renderFeaturedImageStep(this.state.name)
    } else {
      return renderMediaStep(this.state.name)
    }
  }

  getSeventhStep = (): FormStep | any => {
    if (this.state.optionValues.length > 0) {
      return renderMediaStep(this.state.name)
    }
  }

  parseMutationVariables = () => {
    let productParams: any = {
      categories: this.state.categories.map(cat => cat.id),
      tags: this.state.tags,
      images: this.state.images,
      featuredImage: this.state.featuredImage,
      name: this.state.name,
      description: this.state.description,
      minimumSku: this.state.minimumSku,
      sku: this.state.sku,
      price: this.state.price,
      companyId: this.state.companyId,
      optionValues: this.parseOptionValuesForMutation(),
      userId: this.state.userId,
      isTopRatedByMerchant:
        this.state.isTopRatedByMerchant == 'no' ? false : true,
      isFeatured: this.state.isFeatured == 'no' ? false : true
    }
    return {
      params: productParams,
      id: this.state.id
    }
  }

  parseOptionValuesForMutation = () => {
    return this.state.optionValues.map(optionValue => {
      return {
        optionId: optionValue.optionId,
        name: optionValue.name,
        companyId: this.state.companyId
      }
    })
  }

  onCompleted = async res => {
    const {
      updateProduct: { success, fieldErrors }
    } = res
    if (success) {
      this.props.navigation.navigate('Products')
    } else {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    }
  }
}

const _UpdateProductScreen = props => (
  <UserContext.Consumer>
    {({ user }) => <UpdateProductScreen {...props} user={user} />}
  </UserContext.Consumer>
)

_UpdateProductScreen.navigationOptions = {
  header: null
}

export default _UpdateProductScreen
