import React, { PureComponent } from 'react'

import Auth from '../../services/auth'
import FormStepperContainer, {
  FormStep
} from '../../Container/Form/StepperContainer'
import {
  ListCompanyCategoriesGQL,
  ListCompanyProductGroupsGQL
} from '../../graphql/queries/store'

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
  productGroupId: string
  isNewProductVariant: string
  sku: string
  minimumSku: string
  sellingPrice: string
  featuredImage: string
  images: any[]
  name: string
  optionValues: OptionValue[]
  description: string
  listOfCategories: any
  listOfProductGroups: any
  categories: string[]
  tags: string[]
  companyId: string
  userId: string
  currentFormState: string
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
      productGroupId: '',
      sku: '',
      minimumSku: '',
      sellingPrice: '',
      featuredImage: '',
      images: [],
      name: '',
      optionValues: [],
      description: '',
      listOfCategories: [],
      listOfProductGroups: [],
      categories: [],
      tags: [],
      userId: '',
      companyId: '',
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

    if (this.state.companyId && this.state.listOfProductGroups.length <= 0) {
      const {
        screenProps: { client }
      } = this.props
      const {
        data: { listCompanyProductGroups }
      } = await client.query({
        query: ListCompanyProductGroupsGQL,
        variables: { companyId: this.state.companyId }
      })

      const productGroups = listCompanyProductGroups.map(productGroup => ({
        mainLabel: productGroup.title,
        value: productGroup.id,
        options: productGroup.options
      }))
      this.setState({ listOfProductGroups: productGroups })
    }
  }

  updateState = (key: string, value: any) => {
    if (key == 'productGroupId') {
      this.updateProductGroupId(value)
    } else {
      const state = { ...this.state, [key]: value }
      this.setState(state)
    }
  }

  updateProductGroupId = id => {
    const productGroup = this.state.listOfProductGroups.find(
      productGrp => productGrp.value == id
    )
    const optionValues = productGroup.options.map(option => ({
      ...option,
      name: ''
    }))
    this.setState({
      productGroupId: id,
      optionValues,
      productGroupTitle: productGroup.mainLabel
    })
  }

  updateOptionValues = () => {}

  render() {
    return (
      <FormStepperContainer
        formData={this.state}
        updateValueChange={this.updateState}
        fieldErrors={this.state.fieldErrors}
        handleBackPress={() => this.props.navigation.goBack()}
        onCompleteSteps={this.completeSteps}
        steps={this.parseFormSteps()}
        onTransition={this.onTransition}
      />
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

  getProductTitle = () => {
    return this.state.productGroupTitle
  }

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
            name: 'productGroupId',
            type: {
              type: 'picker',
              options: this.state.listOfProductGroups
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
        this.getProductTitle()
      )
    } else if (
      this.state.currentFormState == STATE_TYPES.ExistingNonPredefined
    ) {
      return renderSelectOptionsFormStep(this.getProductTitle())
    } else {
      return {
        stepTitle: `Does ${this.getProductTitle()} comes in different versions like colors or sizes?`,
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
      return renderProductDescriptionStep(this.getProductTitle())
    } else if (
      this.state.currentFormState == STATE_TYPES.ExistingNonPredefined
    ) {
      return renderOptionValuesInputStep(
        this.state.optionValues,
        this.getProductTitle()
      )
    } else if (
      this.state.currentFormState == STATE_TYPES.NewProductVariant ||
      this.state.currentFormState == STATE_TYPES.NewProduct
    ) {
      return renderSelectOptionsFormStep(this.getProductTitle())
    } else if (
      this.state.currentFormState == STATE_TYPES.NewProductNonVariant
    ) {
      return renderProductDescriptionStep(this.getProductTitle())
    }
  }

  getFifthStep = (): FormStep | any => {
    if (this.state.currentFormState == STATE_TYPES.ExistingPredefined) {
      return renderCategoryStep(this.state.listOfCategories)
    } else if (
      this.state.currentFormState == STATE_TYPES.ExistingNonPredefined
    ) {
      return renderProductDescriptionStep(this.getProductTitle())
    } else if (this.state.currentFormState == STATE_TYPES.NewProductVariant) {
      return renderOptionValuesInputStep(
        this.state.optionValues,
        this.getProductTitle()
      )
    } else if (
      this.state.currentFormState == STATE_TYPES.NewProductNonVariant
    ) {
      return renderCategoryStep(this.state.listOfCategories)
    }
  }

  getSixthStep = (): FormStep | any => {
    if (this.state.currentFormState == STATE_TYPES.ExistingPredefined) {
      return renderTagStep(this.getProductTitle())
    } else if (
      this.state.currentFormState == STATE_TYPES.ExistingNonPredefined
    ) {
      return renderCategoryStep(this.state.listOfCategories)
    } else if (this.state.currentFormState == STATE_TYPES.NewProductVariant) {
      return renderProductDescriptionStep(this.getProductTitle())
    } else if (
      this.state.currentFormState == STATE_TYPES.NewProductNonVariant
    ) {
      return renderTagStep(this.getProductTitle())
    }
  }

  getSeventhStep = (): FormStep | any => {
    if (this.state.currentFormState == STATE_TYPES.ExistingPredefined) {
      return renderFeaturedImageStep(this.getProductTitle())
    } else if (
      this.state.currentFormState == STATE_TYPES.ExistingNonPredefined
    ) {
      return renderTagStep(this.getProductTitle())
    } else if (this.state.currentFormState == STATE_TYPES.NewProductVariant) {
      return renderCategoryStep(this.state.listOfCategories)
    } else if (
      this.state.currentFormState == STATE_TYPES.NewProductNonVariant
    ) {
      return renderFeaturedImageStep(this.getProductTitle())
    }
  }

  getEightStep = (): FormStep | any => {
    if (this.state.currentFormState == STATE_TYPES.ExistingPredefined) {
      return renderImagesStep(this.getProductTitle())
    } else if (
      this.state.currentFormState == STATE_TYPES.ExistingNonPredefined
    ) {
      return renderFeaturedImageStep(this.getProductTitle())
    } else if (this.state.currentFormState == STATE_TYPES.NewProductVariant) {
      return renderTagStep(this.getProductTitle())
    } else if (
      this.state.currentFormState == STATE_TYPES.NewProductNonVariant
    ) {
      return renderImagesStep(this.getProductTitle())
    }
  }

  getNinthStep = (): FormStep | any => {
    if (this.state.currentFormState == STATE_TYPES.ExistingNonPredefined) {
      return renderImagesStep(this.getProductTitle())
    } else if (this.state.currentFormState == STATE_TYPES.NewProductVariant) {
      return renderFeaturedImageStep(this.getProductTitle())
    }
  }

  getTenthStep = (): FormStep | any => {
    if (this.state.currentFormState == STATE_TYPES.NewProductVariant) {
      return renderImagesStep(this.getProductTitle())
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
        type: 'multi-picker',
        options: []
      },
      name: 'optionValues'
    }
  ]
})

const renderProductDescriptionStep = (name): FormStep => ({
  stepTitle: `${name} details`,
  formFields: [
    {
      label: 'Description',
      type: {
        type: 'input',
        multiline: true
      },
      name: 'description'
    },
    {
      label: 'How much do you sell each?',
      type: {
        type: 'input'
      },
      name: 'sellingPrice'
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
    name: `option-${optionValue.optionId}`
  }))
})

const renderCategoryStep = categories => ({
  stepTitle: 'Categorize this product',
  formFields: [
    {
      label: 'Categories',
      type: {
        type: 'multi-picker',
        options: categories
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
