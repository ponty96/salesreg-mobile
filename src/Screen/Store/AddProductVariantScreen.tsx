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
  productGroupTitle: string
  productGroup: any
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

class AddProductVariantScreen extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      productGroupTitle: '',
      productGroup: null,
      ...DEFAULT_PRODUCT_PARAMS,
      userId: '',
      companyId: '',
      productId: null,
      currentFormState: '',
      fieldErrors: null
    }
  }

  componentWillMount() {
    const product = this.props.navigation.getParam('product')
    const { productGroup } = product

    const optionValues = productGroup.options.map(option => ({
      ...option,
      name: ''
    }))

    const productParams = this.getProductParams(productGroup, product)
    this.setState({
      ...productParams,
      productGroup: productGroup,
      productGroupTitle: productGroup.title,
      optionValues,
      currentFormState:
        productGroup.options.length == 0
          ? STATE_TYPES.ExistingNonPredefined
          : STATE_TYPES.ExistingPredefined,
      userId: this.props.user.id,
      companyId: this.props.user.company.id
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

  getProductParams = (productGroup, product) => {
    if (productGroup.options.length == 0) {
      return {
        productId: product.id,
        ...product,
        tags: product.tags.map(tag => tag.name),
        isTopRatedByMerchant:
          product.isTopRatedByMerchant == false ? 'no' : 'yes',
        isFeatured: product.isFeatured == false ? 'No' : 'Yes',
        sku: product.number
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
              key="createProduct-1996"
            />
          ]
        ]}
      </Mutation>
    )
  }

  parseFormSteps = (): FormStep[] => {
    const defaultSteps: FormStep[] = [
      this.getThirdStep(),
      this.getFourthStep(),
      this.getFifthStep(),
      this.getSixthStep(),
      this.getSeventhStep(),
      this.getEightStep(),
      this.getNinthStep()
    ]
    return defaultSteps
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
    }
  }

  getFifthStep = (): FormStep | any => {
    if (this.state.currentFormState == STATE_TYPES.ExistingPredefined) {
      return renderCategoryStep('product')
    } else if (
      this.state.currentFormState == STATE_TYPES.ExistingNonPredefined
    ) {
      return renderProductDescriptionStep(this.getProductName())
    }
  }

  getSixthStep = (): FormStep | any => {
    if (this.state.currentFormState == STATE_TYPES.ExistingPredefined) {
      return renderTagStep(this.getProductName(), 'product')
    } else if (
      this.state.currentFormState == STATE_TYPES.ExistingNonPredefined
    ) {
      return renderCategoryStep('product')
    }
  }

  getSeventhStep = (): FormStep | any => {
    if (this.state.currentFormState == STATE_TYPES.ExistingPredefined) {
      return renderFeaturedImageStep(this.getProductName())
    } else if (
      this.state.currentFormState == STATE_TYPES.ExistingNonPredefined
    ) {
      return renderTagStep(this.getProductName(), 'product')
    }
  }

  getEightStep = (): FormStep | any => {
    if (this.state.currentFormState == STATE_TYPES.ExistingPredefined) {
      return renderMediaStep(this.getProductName())
    } else if (
      this.state.currentFormState == STATE_TYPES.ExistingNonPredefined
    ) {
      return renderFeaturedImageStep(this.getProductName())
    }
  }

  getNinthStep = (): FormStep | any => {
    if (this.state.currentFormState == STATE_TYPES.ExistingNonPredefined) {
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
      isFeatured: this.state.isFeatured == 'No' ? false : true
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

const _AddProductVariantScreen: any = props => (
  <UserContext.Consumer>
    {({ user }) => <AddProductVariantScreen {...props} user={user} />}
  </UserContext.Consumer>
)

_AddProductVariantScreen.navigationOptions = {
  header: null
}

export default _AddProductVariantScreen
