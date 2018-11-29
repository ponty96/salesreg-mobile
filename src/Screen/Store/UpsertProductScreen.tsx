import React, { PureComponent } from 'react'

import { Mutation } from 'react-apollo'
import AppSpinner from '../../Components/Spinner'
import { parseFieldErrors } from '../../Functions'
import Auth from '../../services/auth'
import FormStepperContainer, {
  FormStep
} from '../../Container/Form/StepperContainer'
import {
  SearchOptionsByNameGQL,
  SearchProductGroupsByTitleGQL,
  SearchCategoriesByTitleGQL,
  ListCompanyProductsGQL
} from '../../graphql/queries/store'
import { CreateProductGQL } from '../../graphql/mutations/store'

interface IProps {
  navigation: any
  screenProps: any
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
  sellingPrice: string | number
  featuredImage: string
  images: any[]
  name: string
  optionValues: OptionValue[]
  description: string
  categories: any[]
  tags: any[]
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

class UpsertProductScreen extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      isVariant: '',
      productGroupTitle: '',
      isNewProductVariant: '',
      productGroup: null,
      sku: 0,
      minimumSku: 0,
      sellingPrice: '',
      featuredImage:
        'https://cdn2.jomashop.com/media/catalog/product/cache/1/watermark/490x490/0a1186946c551c1cc1f1a1120b7bd9a0/h/u/hublot-big-bang-mens-watch-301.px.130.rx.174.jpg',
      images: [],
      name: '',
      optionValues: [],
      description: '',
      categories: [],
      tags: [],
      userId: '',
      companyId: '',
      productId: null,
      currentFormState: '',
      fieldErrors: null
    }
  }

  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    this.updateDetails()
  }

  updateDetails = async () => {
    const user = JSON.parse(await Auth.getCurrentUser())
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
      optionValues,
      productGroupTitle: productGroup.title,
      ...productParams
    })
  }

  getProductParams = productGroup => {
    if (productGroup.products.length == 1) {
      const product = productGroup.products[0]
      return {
        productId: product.id,
        ...product,
        tags: product.tags.map(tag => tag.name)
      }
    } else {
      return {}
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
      currentState =
        this.state.isVariant == 'New Product'
          ? STATE_TYPES.NewProduct
          : STATE_TYPES.ExistingProduct
    } else if (from == 2 && to == 3) {
      if (currentState !== STATE_TYPES.NewProduct) {
        currentState =
          this.state.optionValues.length > 0
            ? STATE_TYPES.ExistingPredefined
            : STATE_TYPES.ExistingNonPredefined
      }
    } else if (from == 3 && to == 4 && currentState == STATE_TYPES.NewProduct) {
      currentState =
        this.state.isNewProductVariant == 'Yes'
          ? STATE_TYPES.NewProductVariant
          : STATE_TYPES.NewProductNonVariant
    } else if (
      from == 4 &&
      to == 3 &&
      currentState == STATE_TYPES.NewProductVariant
    ) {
      // clear option values and other details that have already been filled from step 3 forward
      currentState = STATE_TYPES.NewProduct
    } else if (
      from == 4 &&
      to == 3 &&
      currentState == STATE_TYPES.NewProductNonVariant
    ) {
      // clear details that have already been filled from step 3 forward
      currentState = STATE_TYPES.NewProduct
    }

    return this.setState({ currentFormState: currentState })
  }

  getSecondStep = (): FormStep => {
    if (this.state.currentFormState !== STATE_TYPES.NewProduct) {
      return {
        stepTitle: 'Choose from list of existing products?',
        formFields: [
          {
            label: 'Choose product',
            placeholder: '',
            name: 'productGroup',
            type: {
              type: 'search-picker',
              searchQuery: SearchProductGroupsByTitleGQL,
              searchQueryResponseKey: 'searchProductGroupsByTitle'
            }
          }
        ]
      }
    } else
      return {
        stepTitle: 'Name this product?',
        formFields: [
          {
            label: 'Product name',
            placeholder: 'e.g Leather Shoe',
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
      return renderSelectOptionsFormStep(this.getProductName())
    } else {
      return {
        stepTitle: `Does ${this.getProductName()} comes in different versions like colors or sizes?`,
        formFields: [
          {
            label: 'Yes or No',
            name: 'isNewProductVariant',
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
      return renderSelectOptionsFormStep(this.getProductName())
    } else if (
      this.state.currentFormState == STATE_TYPES.NewProductNonVariant
    ) {
      return renderProductDescriptionStep(this.getProductName())
    }
  }

  getFifthStep = (): FormStep | any => {
    if (this.state.currentFormState == STATE_TYPES.ExistingPredefined) {
      return renderCategoryStep()
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
      return renderCategoryStep()
    }
  }

  getSixthStep = (): FormStep | any => {
    if (this.state.currentFormState == STATE_TYPES.ExistingPredefined) {
      return renderTagStep(this.getProductName())
    } else if (
      this.state.currentFormState == STATE_TYPES.ExistingNonPredefined
    ) {
      return renderCategoryStep()
    } else if (this.state.currentFormState == STATE_TYPES.NewProductVariant) {
      return renderProductDescriptionStep(this.getProductName())
    } else if (
      this.state.currentFormState == STATE_TYPES.NewProductNonVariant
    ) {
      return renderTagStep(this.getProductName())
    }
  }

  getSeventhStep = (): FormStep | any => {
    if (this.state.currentFormState == STATE_TYPES.ExistingPredefined) {
      return renderFeaturedImageStep(this.getProductName())
    } else if (
      this.state.currentFormState == STATE_TYPES.ExistingNonPredefined
    ) {
      return renderTagStep(this.getProductName())
    } else if (this.state.currentFormState == STATE_TYPES.NewProductVariant) {
      return renderCategoryStep()
    } else if (
      this.state.currentFormState == STATE_TYPES.NewProductNonVariant
    ) {
      return renderFeaturedImageStep(this.getProductName())
    }
  }

  getEightStep = (): FormStep | any => {
    if (this.state.currentFormState == STATE_TYPES.ExistingPredefined) {
      return renderImagesStep(this.getProductName())
    } else if (
      this.state.currentFormState == STATE_TYPES.ExistingNonPredefined
    ) {
      return renderFeaturedImageStep(this.getProductName())
    } else if (this.state.currentFormState == STATE_TYPES.NewProductVariant) {
      return renderTagStep(this.getProductName())
    } else if (
      this.state.currentFormState == STATE_TYPES.NewProductNonVariant
    ) {
      return renderImagesStep(this.getProductName())
    }
  }

  getNinthStep = (): FormStep | any => {
    if (this.state.currentFormState == STATE_TYPES.ExistingNonPredefined) {
      return renderImagesStep(this.getProductName())
    } else if (this.state.currentFormState == STATE_TYPES.NewProductVariant) {
      return renderFeaturedImageStep(this.getProductName())
    }
  }

  getTenthStep = (): FormStep | any => {
    if (this.state.currentFormState == STATE_TYPES.NewProductVariant) {
      return renderImagesStep(this.getProductName())
    }
  }

  parseMutationVariables = () => {
    let productParams: any = {
      categories: this.state.categories.map(cat => cat.id),
      tags: this.state.tags,
      images: this.state.images,
      featuredImage: this.state.featuredImage,
      name: this.getProductName(),
      description: this.state.description,
      minimumSku: this.state.minimumSku,
      sku: this.state.sku,
      sellingPrice: this.state.sellingPrice,
      companyId: this.state.companyId,
      optionValues: this.parseOptionValuesForMutation(),
      userId: this.state.userId
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
        optionValue => optionValue.name
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

const renderSelectOptionsFormStep = (name): FormStep => ({
  stepTitle: `Select the variant options for ${name}`,
  stepHint: `Variant options are what makes one ${name} different from another ${name}. E.g. color, sizes`,
  formFields: [
    {
      label: 'Select options',
      type: {
        type: 'search-multi-picker',
        searchQuery: SearchOptionsByNameGQL,
        searchQueryResponseKey: 'searchOptionsByName'
      },
      name: 'optionValues'
    }
  ]
})

const renderProductDescriptionStep = (name): FormStep => ({
  stepTitle: `${name} details`,
  formFields: [
    {
      label: 'How much do you sell each?',
      type: {
        type: 'input',
        keyboardType: 'numeric'
      },
      name: 'sellingPrice'
    },
    {
      label: 'What is the current quantity in Stock',
      type: {
        type: 'input',
        multiline: true
      },
      name: 'sku'
    },
    {
      label: 'What is the minimum stock quantity',
      type: {
        type: 'input',
        multiline: true
      },
      name: 'minimumSku',
      underneathText: `The minimum stock quantity(MSQ) is the quantity of ${name} below which you have to restock.`
    },
    {
      label: 'Description',
      type: {
        type: 'input',
        multiline: true
      },
      name: 'description'
    }
  ]
})

const renderOptionValuesInputStep = (optionValues: OptionValue[], name) => ({
  stepTitle: `Enter variant values for ${name}`,
  formFields: optionValues.map(optionValue => ({
    label: `${name} ${optionValue.optionName}`,
    type: {
      type: 'input',
      keyboardType: 'default'
    },
    name: `option-${optionValue.optionId}`,
    value: optionValue.name
  }))
})

const renderCategoryStep = () => ({
  stepTitle: 'Categorize this product',
  formFields: [
    {
      label: 'Categories',
      type: {
        type: 'search-multi-picker',
        searchQuery: SearchCategoriesByTitleGQL,
        searchQueryResponseKey: 'searchCategoriesByTitle'
      },
      name: 'categories'
    }
  ]
})

const renderTagStep = name => ({
  stepTitle: `Add tags to ${name}`,
  stepHint:
    ' \nTags will enhance your filters and your customer abilities to find services within select tags',
  formFields: [{ label: 'Tags', type: { type: 'tag-input' }, name: 'tags' }]
})

const renderFeaturedImageStep = name => ({
  stepTitle: `Lets add images for ${name} starting from the landing images`,
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
})

const renderImagesStep = name => ({
  stepTitle: `Lets now add other images for ${name}`,
  stepHint: `Images will be displayed on the details section of your webstore. Customers can view multiple images of ${name}`,
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
})

export default UpsertProductScreen
