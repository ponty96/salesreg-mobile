import React, { PureComponent } from 'react'

import { Mutation } from 'react-apollo'
import AppSpinner from '../../Components/Spinner'
import { parseFieldErrors } from '../../Functions'
import FormStepperContainer, {
  FormStep
} from '../../Container/Form/StepperContainer'
import { ListCompanyProductsGQL } from '../../graphql/queries/store'
import { CreateProductGQL } from '../../graphql/mutations/store'
import {
  renderCategoryStep,
  renderFeaturedImageStep,
  renderOptionValuesInputStep,
  renderMediaStep,
  renderProductDescriptionStep,
  renderSelectProductGroupFormStep,
  renderSelectOptionsFormStep,
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
  isVariant: string
  productGroupTitle: string
  productGroup: any
  isNewProductVariant: string
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
  productId?: string
  fieldErrors: any
}

const STATE_TYPES = {
  NewProduct: 'New Product',
  ExistingProduct: 'Existing Product',
  ExistingPredefined: 'Existing with predefined variants',
  ExistingNonPredefined: 'Existing without prefined variants',
  NewProductVariant: 'New product with variant',
  NewProductNonVariant: 'New product without variant'
}

const DEFAULT_PRODUCT_PARAMS = {
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
  tags: []
}

class CreateProductScreen extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      isVariant: '',
      productGroupTitle: '',
      isNewProductVariant: '',
      productGroup: null,
      ...DEFAULT_PRODUCT_PARAMS,
      userId: '',
      companyId: '',
      productId: null,
      currentFormState: '',
      fieldErrors: null
    }
  }

  componentDidMount() {
    this.updateDetails()
  }

  updateDetails = async () => {
    const { user } = this.props
    this.setState({
      userId: user.id,
      companyId: user.company.id
    })
  }

  updateState = (key: string, value: any) => {
    if (key == 'productGroup') {
      this.updateProductGroup(value)
    } else if (key.indexOf('option-') == 0) {
      this.updateOptionValues(key, value)
    } else {
      const state = { ...this.state, [key]: value }
      this.setState(state)
    }
  }

  updateProductGroup = productGroup => {
    const optionValues = productGroup.options.map(option => ({
      ...option,
      name: ''
    }))
    const productParams = this.getProductParams(productGroup)
    this.setState({
      productGroup: productGroup,
      productGroupTitle: productGroup.title,
      ...productParams,
      optionValues
    })
  }

  getProductParams = productGroup => {
    if (productGroup.options.length == 0) {
      const product = productGroup.products[0]
      return {
        productId: product.id,
        ...product,
        tags: product.tags.map(tag => tag.name),
        isTopRatedByMerchant:
          product.isTopRatedByMerchant == false ? 'no' : 'yes',
        isFeatured: product.isFeatured == false ? 'no' : 'yes'
      }
    } else {
      return DEFAULT_PRODUCT_PARAMS
    }
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
        mutation={CreateProductGQL}
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
        {(createProduct, { loading }) => [
          [
            <AppSpinner visible={loading} key="createProduct-1345" />,
            <FormStepperContainer
              formData={this.state}
              updateValueChange={this.updateState}
              fieldErrors={this.state.fieldErrors}
              handleBackPress={() => this.props.navigation.goBack()}
              onCompleteSteps={() => {
                createProduct({ variables: this.parseMutationVariables() })
              }}
              steps={this.parseFormSteps()}
              onTransition={this.onTransition}
              key="createProduct-1996"
            />
          ]
        ]}
      </Mutation>
    )
  }

  parseFormSteps = (): FormStep[] => {
    const defaultSteps: FormStep[] = [
      {
        stepTitle: 'Is this a new product or variant of an existing product?',
        formFields: [
          {
            label: 'New or Variant of existing?',
            placeholder: '',
            validators: ['required'],
            name: 'isVariant',
            type: {
              type: 'radio',
              options: ['New Product', 'Variant of Existing product']
            }
          }
        ]
      },
      this.getSecondStep(),
      this.getThirdStep(),
      this.getFourthStep(),
      this.getFifthStep(),
      this.getSixthStep(),
      this.getSeventhStep(),
      this.getEightStep(),
      this.getNinthStep(),
      this.getTenthStep()
    ]

    return defaultSteps
  }

  completeSteps = () => {}

  onTransition = async (from, to) => {
    // update state status based on transition
    let currentState = this.state.currentFormState
    if (from == 1 && to == 2) {
      let oldState = currentState
      currentState =
        this.state.isVariant == 'New Product'
          ? STATE_TYPES.NewProduct
          : STATE_TYPES.ExistingProduct

      this.updateStateAfterTransition(oldState, currentState)
    } else if (from == 2 && to == 3) {
      if (currentState !== STATE_TYPES.NewProduct) {
        currentState =
          this.state.optionValues.length > 0
            ? STATE_TYPES.ExistingPredefined
            : STATE_TYPES.ExistingNonPredefined
      }
    } else if (from == 3 && to == 4 && currentState == STATE_TYPES.NewProduct) {
      let oldState = currentState
      currentState =
        this.state.isNewProductVariant == 'Yes'
          ? STATE_TYPES.NewProductVariant
          : STATE_TYPES.NewProductNonVariant
      this.updateStateAfterTransition(oldState, currentState)
    } else if (
      from == 4 &&
      to == 3 &&
      currentState == STATE_TYPES.NewProductVariant
    ) {
      currentState = STATE_TYPES.NewProduct
    } else if (
      from == 4 &&
      to == 3 &&
      currentState == STATE_TYPES.NewProductNonVariant
    ) {
      currentState = STATE_TYPES.NewProduct
    }

    return this.setState({ currentFormState: currentState })
  }

  updateStateAfterTransition = (currentState, newState) => {
    if (
      currentState == STATE_TYPES.NewProduct &&
      newState == STATE_TYPES.NewProductNonVariant
    ) {
      this.setState({ optionValues: [] })
    } else if (
      newState !== currentState &&
      (newState == STATE_TYPES.NewProduct ||
        newState == STATE_TYPES.ExistingProduct)
    ) {
      this.setState({
        productGroup: null,
        productGroupTitle: '',
        optionValues: []
      })
    }
  }

  getSecondStep = (): FormStep => {
    if (this.state.currentFormState !== STATE_TYPES.NewProduct) {
      return renderSelectProductGroupFormStep()
    } else
      return {
        stepTitle: 'Name this product?',
        formFields: [
          {
            label: 'Product name',
            placeholder: 'e.g Leather Shoe',
            validators: ['required'],
            name: 'productGroupTitle',
            type: {
              type: 'input'
            }
          }
        ]
      }
  }

  getThirdStep = (): FormStep | any => {
    if (this.state.currentFormState == STATE_TYPES.ExistingPredefined) {
      return renderOptionValuesInputStep(
        this.state.optionValues,
        this.state.productGroupTitle
      )
    } else if (
      this.state.currentFormState == STATE_TYPES.ExistingNonPredefined
    ) {
      return renderSelectOptionsFormStep(this.state.productGroupTitle)
    } else {
      return {
        stepTitle: `Does ${
          this.state.productGroupTitle
        } comes in different versions like colors or sizes?`,
        formFields: [
          {
            label: 'Yes or No',
            name: 'isNewProductVariant',
            validators: ['required'],
            type: {
              type: 'radio',
              options: ['Yes', 'No']
            },
            underneathText:
              'Each version of a product is called a variant of that product. A cover shoe for instance, may come in different colors and sizes, each bag with a different color and/or size is a variant of the bag'
          }
        ]
      }
    }
  }

  getFourthStep = (): FormStep | any => {
    if (this.state.currentFormState == STATE_TYPES.ExistingPredefined) {
      return renderProductDescriptionStep(this.getProductName())
    } else if (
      this.state.currentFormState == STATE_TYPES.ExistingNonPredefined
    ) {
      return renderOptionValuesInputStep(
        this.state.optionValues,
        this.state.productGroupTitle
      )
    } else if (
      this.state.currentFormState == STATE_TYPES.NewProductVariant ||
      this.state.currentFormState == STATE_TYPES.NewProduct
    ) {
      return renderSelectOptionsFormStep(this.state.productGroupTitle)
    } else if (
      this.state.currentFormState == STATE_TYPES.NewProductNonVariant
    ) {
      return renderProductDescriptionStep(this.getProductName())
    }
  }

  getFifthStep = (): FormStep | any => {
    if (this.state.currentFormState == STATE_TYPES.ExistingPredefined) {
      return renderCategoryStep('product')
    } else if (
      this.state.currentFormState == STATE_TYPES.ExistingNonPredefined
    ) {
      return renderProductDescriptionStep(this.getProductName())
    } else if (this.state.currentFormState == STATE_TYPES.NewProductVariant) {
      return renderOptionValuesInputStep(
        this.state.optionValues,
        this.state.productGroupTitle
      )
    } else if (
      this.state.currentFormState == STATE_TYPES.NewProductNonVariant
    ) {
      return renderCategoryStep('product')
    }
  }

  getSixthStep = (): FormStep | any => {
    if (this.state.currentFormState == STATE_TYPES.ExistingPredefined) {
      return renderTagStep(this.getProductName(), 'product')
    } else if (
      this.state.currentFormState == STATE_TYPES.ExistingNonPredefined
    ) {
      return renderCategoryStep('product')
    } else if (this.state.currentFormState == STATE_TYPES.NewProductVariant) {
      return renderProductDescriptionStep(this.getProductName())
    } else if (
      this.state.currentFormState == STATE_TYPES.NewProductNonVariant
    ) {
      return renderTagStep(this.getProductName(), 'product')
    }
  }

  getSeventhStep = (): FormStep | any => {
    if (this.state.currentFormState == STATE_TYPES.ExistingPredefined) {
      return renderFeaturedImageStep(this.getProductName())
    } else if (
      this.state.currentFormState == STATE_TYPES.ExistingNonPredefined
    ) {
      return renderTagStep(this.getProductName(), 'product')
    } else if (this.state.currentFormState == STATE_TYPES.NewProductVariant) {
      return renderCategoryStep('product')
    } else if (
      this.state.currentFormState == STATE_TYPES.NewProductNonVariant
    ) {
      return renderFeaturedImageStep(this.getProductName())
    }
  }

  getEightStep = (): FormStep | any => {
    if (this.state.currentFormState == STATE_TYPES.ExistingPredefined) {
      return renderMediaStep(this.getProductName())
    } else if (
      this.state.currentFormState == STATE_TYPES.ExistingNonPredefined
    ) {
      return renderFeaturedImageStep(this.getProductName())
    } else if (this.state.currentFormState == STATE_TYPES.NewProductVariant) {
      return renderTagStep(this.getProductName(), 'product')
    } else if (
      this.state.currentFormState == STATE_TYPES.NewProductNonVariant
    ) {
      return renderMediaStep(this.getProductName())
    }
  }

  getNinthStep = (): FormStep | any => {
    if (this.state.currentFormState == STATE_TYPES.ExistingNonPredefined) {
      return renderMediaStep(this.getProductName())
    } else if (this.state.currentFormState == STATE_TYPES.NewProductVariant) {
      return renderFeaturedImageStep(this.getProductName())
    }
  }

  getTenthStep = (): FormStep | any => {
    if (this.state.currentFormState == STATE_TYPES.NewProductVariant) {
      return renderMediaStep(this.getProductName())
    }
  }

  parseMutationVariables = () => {
    let productParams: any = {
      categories: this.state.categories.map(cat => cat.id),
      tags: this.state.tags,
      images: this.state.images,
      featuredImage: this.state.featuredImage,
      name: '',
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
    let params: any = {
      companyId: this.state.companyId,
      productGroupTitle: this.state.productGroupTitle
    }

    if (this.state.productGroup) {
      params = { ...params, productGroupId: this.state.productGroup.id }
    }
    if (this.state.productId) {
      productParams = { ...productParams, id: this.state.productId }
    }
    return {
      params: { ...params, product: productParams }
    }
  }

  getProductName = () => {
    if (this.state.optionValues.length > 0) {
      return `${this.state.productGroupTitle} (${this.state.optionValues.map(
        optionValue => optionValue.name || '?'
      )})`
    } else return this.state.productGroupTitle
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
      createProduct: { success, fieldErrors }
    } = res
    if (success) {
      this.props.navigation.navigate('Products')
    } else {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    }
  }
}

const _CreateProductScreen: any = props => (
  <UserContext.Consumer>
    {({ user }) => <CreateProductScreen {...props} user={user} />}
  </UserContext.Consumer>
)

_CreateProductScreen.navigationOptions = {
  header: null
}

export default _CreateProductScreen
