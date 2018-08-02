import React, { PureComponent } from 'react'
import { Mutation } from 'react-apollo'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
// tslint:disable-next-line:no-implicit-dependencies
import { ScrollView } from 'react-native-gesture-handler'
import FormContainerAtom from '../Atom/FormContainerAtom'
import FormImageAtom from '../Atom/FormImageAtom'
import InputAtom from '../Atom/InputAtom'
import CustomHeader from '../Components/CustomHeader'
import AppSpinner from '../Components/Spinner'
import SaveCancelButton from '../Container/SaveCancelButton'
import { parseFieldErrors } from '../Functions'
import { UpsertProductGQL } from '../graphql/mutations/product-service'
import Auth from '../services/auth'

interface IProps {
  navigation: any
}

interface IState {
  image: any
  name: string
  currentStock: string
  minStock: string
  costPrice: string
  sellingPrice: string
  description: string
  userId: string
  companyId: string
  fieldErrors: any
}

class UpsertProductScreen extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      name: '',
      image:
        'https://irp-cdn.multiscreensite.com/649127fb/dms3rep/multi/mobile/ic1.png',
      currentStock: '',
      minStock: '',
      costPrice: '',
      sellingPrice: '',
      description: '',
      companyId: '',
      userId: '',
      fieldErrors: null
    }
  }
  // tslint:disable-next-line:member-ordering
  public static navigationOptions = ({ navigation }: any) => {
    const product = navigation.getParam('product', null)
    return {
      header: (
        <CustomHeader
          title={product ? `Edit Product ${product.name}` : 'New Product'}
          // tslint:disable-next-line:jsx-no-lambda
          onBackPress={() => navigation.goBack()}
        />
      )
    }
  }
  public componentDidMount() {
    const product = this.props.navigation.getParam('product', null)
    if (product) {
      this.setState({
        ...product,
        image: product.image
          ? product.image
          : 'https://irp-cdn.multiscreensite.com/649127fb/dms3rep/multi/mobile/ic1.png',
        minStock: product.minimumStockQuantity,
        currentStock: product.number
      })
    }
    this.updateDetails()
  }

  public updateDetails = async () => {
    const user = JSON.parse(await Auth.getCurrentUser())
    this.setState({
      userId: user.id,
      companyId: user.company.id
    })
  }

  public create = () => {
    this.props.navigation.goBack()
  }

  public getImage = (pic: any) => {
    this.setState((prevState: any) => ({
      image: {
        ...prevState.image,
        uri: pic
      }
    }))
  }

  public updateState = (key: string, value: any) => {
    const state = { ...this.state, [key]: value }
    this.setState(state)
  }

  public render() {
    const { fieldErrors } = this.state
    return (
      <Mutation mutation={UpsertProductGQL} onCompleted={this.onCompleted}>
        {(upsertProduct, { loading }) => (
          <View style={styles.ababa}>
            <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={60}
              style={styles.itemsContainer}
            >
              <AppSpinner visible={loading} />
              <ScrollView>
                <FormImageAtom
                  form="product"
                  getValue={this.getImage}
                  source={this.state.image}
                />

                <FormContainerAtom headerText="Product Name">
                  <InputAtom
                    label="*Product name"
                    defaultValue={this.state.name}
                    // tslint:disable-next-line:jsx-no-lambda
                    getValue={val => this.updateState('name', val)}
                    error={fieldErrors && fieldErrors.name}
                    underneathStyle={styles.underneathStyle}
                  />
                </FormContainerAtom>
                <FormContainerAtom headerText="Quantity">
                  <View>
                    <InputAtom
                      label="*Current Stock Quantity"
                      // tslint:disable-next-line:jsx-no-lambda
                      getValue={val => this.updateState('currentStock', val)}
                      keyboardType="numeric"
                      underneathText="Quantity available in store as at now"
                      underneathStyle={styles.underneathStyle}
                      defaultValue={this.state.currentStock}
                      error={fieldErrors && fieldErrors.stockQuantity}
                    />
                  </View>
                  <View>
                    <InputAtom
                      label="*Minimum Stock Quantity"
                      // tslint:disable-next-line:jsx-no-lambda
                      getValue={val => this.updateState('minStock', val)}
                      keyboardType="numeric"
                      underneathText="Minimum quantity required for re-stock"
                      underneathStyle={styles.underneathStyle}
                      defaultValue={this.state.minStock}
                      error={fieldErrors && fieldErrors.minimumStockQuantity}
                    />
                  </View>
                </FormContainerAtom>
                <FormContainerAtom headerText="Cost/Selling Price for each">
                  <InputAtom
                    label={`*Cost Price each \u20A6`}
                    // tslint:disable-next-line:jsx-no-lambda
                    getValue={val => this.updateState('costPrice', val)}
                    keyboardType="numeric"
                    defaultValue={this.state.costPrice}
                    error={fieldErrors && fieldErrors.costPrice}
                    underneathStyle={styles.underneathStyle}
                  />
                  <InputAtom
                    label={`*Selling Price each \u20A6`}
                    // tslint:disable-next-line:jsx-no-lambda
                    getValue={val => this.updateState('sellingPrice', val)}
                    keyboardType="numeric"
                    defaultValue={this.state.sellingPrice}
                    underneathStyle={styles.underneathStyle}
                    error={fieldErrors && fieldErrors.sellingPrice}
                  />
                </FormContainerAtom>
                <FormContainerAtom headerText="Description">
                  <View>
                    <InputAtom
                      label="Product Description"
                      // tslint:disable-next-line:jsx-no-lambda
                      getValue={val => this.updateState('description', val)}
                      defaultValue={this.state.description}
                      error={fieldErrors && fieldErrors.description}
                      underneathStyle={styles.underneathStyle}
                    />
                  </View>
                </FormContainerAtom>
              </ScrollView>
            </KeyboardAvoidingView>

            <SaveCancelButton
              navigation={this.props.navigation}
              // tslint:disable-next-line:jsx-no-lambda
              createfunc={() =>
                upsertProduct({
                  variables: this.parseMutationVariables()
                })
              }
              positiveButtonName="SAVE"
            />
          </View>
        )}
      </Mutation>
    )
  }

  public parseMutationVariables = () => {
    const product = this.props.navigation.getParam('product', {})
    return {
      companyId: this.state.companyId,
      costPrice: this.state.costPrice,
      description: this.state.description,
      // featuredImage: this.state.image,
      featuredImage: '',
      minimumStockQuantity: this.state.minStock,
      name: this.state.name,
      sellingPrice: this.state.sellingPrice,
      stockQuantity: this.state.currentStock,
      userId: this.state.userId,
      productId: product ? product.id : null
    }
  }
  public onCompleted = async res => {
    const {
      upsertProduct: { success, fieldErrors }
    } = res
    if (success) {
      this.props.navigation.navigate('Products')
    } else {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    }
  }
}

export default UpsertProductScreen

const styles = StyleSheet.create({
  ababa: {
    flex: 1,
    backgroundColor: '#fff'
  },
  itemsContainer: {
    flex: 4,
    backgroundColor: '#F6F6F6'
  },
  underneathStyle: {
    marginBottom: 0,
    paddingBottom: 0,
    paddingLeft: 8
  }
})
