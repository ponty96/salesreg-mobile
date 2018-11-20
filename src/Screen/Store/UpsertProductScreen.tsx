import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import Header from '../../Components/Header/BaseHeader'
import FormImageAtom from '../../Atom/FormImageAtom'
import InputAtom from '../../Atom/Form/InputAtom'
import FormContainerAtom from '../../Atom/FormContainerAtom'
import SaveCancelButton from '../../Container/SaveCancelButton'
import { Mutation } from 'react-apollo'
import { UpsertProductGQL } from '../../graphql/mutations/store'
import AppSpinner from '../../Components/Spinner'
import { parseFieldErrors } from '../../Functions'
import { Container, Content, Form } from 'native-base'
import { UserContext } from '../../context/UserContext'

interface IProps {
  navigation: any
  user: any
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
  static navigationOptions = ({ navigation }: any) => {
    const product = navigation.getParam('product', null)
    return {
      header: (
        <Header
          title={product ? `Edit Product ${product.name}` : 'New Product'}
          onPressLeftIcon={() => navigation.goBack()}
        />
      )
    }
  }
  componentDidMount() {
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

  updateDetails = async () => {
    const { user } = this.props
    this.setState({
      userId: user.id,
      companyId: user.company.id
    })
  }

  create = () => {
    this.props.navigation.goBack()
  }

  getImage = (pic: any) => {
    this.setState((prevState: any) => ({
      image: {
        ...prevState.image,
        uri: pic
      }
    }))
  }

  updateState = (key: string, value: any) => {
    const state = { ...this.state, [key]: value }
    this.setState(state)
  }

  render() {
    const { fieldErrors } = this.state
    return (
      <Mutation mutation={UpsertProductGQL} onCompleted={this.onCompleted}>
        {(upsertProduct, { loading }) => (
          <Container>
            <Content>
              <Form>
                <AppSpinner visible={loading} />
                <FormImageAtom
                  form="product"
                  getValue={this.getImage}
                  source={this.state.image}
                />

                <FormContainerAtom headerText="Product Name">
                  <InputAtom
                    label="*Product name"
                    defaultValue={this.state.name}
                    getValue={val => this.updateState('name', val)}
                    error={fieldErrors && fieldErrors['name']}
                    underneathStyle={styles.underneathStyle}
                    placeholder="e.g Hublot Geneve Brown Watch"
                  />
                </FormContainerAtom>
                <FormContainerAtom headerText="Quantity">
                  <View>
                    <InputAtom
                      label="*Current Stock Quantity"
                      getValue={val => this.updateState('currentStock', val)}
                      keyboardType="numeric"
                      underneathText="Quantity available in store as at now"
                      underneathStyle={styles.underneathStyle}
                      defaultValue={this.state.currentStock}
                      error={fieldErrors && fieldErrors['stockQuantity']}
                      placeholder="e.g 30"
                    />
                  </View>
                  <View>
                    <InputAtom
                      label="*Minimum Stock Quantity"
                      getValue={val => this.updateState('minStock', val)}
                      keyboardType="numeric"
                      underneathText="Minimum quantity required for re-stock"
                      underneathStyle={styles.underneathStyle}
                      defaultValue={this.state.minStock}
                      error={fieldErrors && fieldErrors['minimumStockQuantity']}
                      placeholder="e.g 10"
                    />
                  </View>
                </FormContainerAtom>
                <FormContainerAtom headerText="Cost/Selling Price for each">
                  <InputAtom
                    label={`*Cost Price each \u20A6`}
                    getValue={val => this.updateState('costPrice', val)}
                    keyboardType="numeric"
                    defaultValue={this.state.costPrice}
                    error={fieldErrors && fieldErrors['costPrice']}
                    underneathStyle={styles.underneathStyle}
                    placeholder="e.g 10,000"
                  />
                  <InputAtom
                    label={`*Selling Price each \u20A6`}
                    getValue={val => this.updateState('sellingPrice', val)}
                    keyboardType="numeric"
                    defaultValue={this.state.sellingPrice}
                    underneathStyle={styles.underneathStyle}
                    error={fieldErrors && fieldErrors['sellingPrice']}
                    placeholder="e.g 15,000"
                  />
                </FormContainerAtom>
                <FormContainerAtom headerText="Description">
                  <View>
                    <InputAtom
                      label="Product Description"
                      getValue={val => this.updateState('description', val)}
                      defaultValue={this.state.description}
                      error={fieldErrors && fieldErrors['description']}
                      underneathStyle={styles.underneathStyle}
                    />
                  </View>
                </FormContainerAtom>
                <SaveCancelButton
                  navigation={this.props.navigation}
                  createfunc={() =>
                    upsertProduct({
                      variables: this.parseMutationVariables()
                    })
                  }
                  positiveButtonName="SAVE"
                />
              </Form>
            </Content>
          </Container>
        )}
      </Mutation>
    )
  }

  parseMutationVariables = () => {
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
  onCompleted = async res => {
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

const _UpsertProductScreen = props => (
  <UserContext.Consumer>
    {user => <UpsertProductScreen {...props} user={user} />}
  </UserContext.Consumer>
)

export default _UpsertProductScreen

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
