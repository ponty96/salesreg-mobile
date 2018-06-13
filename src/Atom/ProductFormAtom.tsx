import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ImageAtom from './ImageAtom'
import InputAtom from './InputAtom'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

export default class ProductFormAtom extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      product: '',
      image: { uri: 'https://www.iconsdb.com/icons/preview/gray/shop-xxl.png' },
      squantity: '',
      pquantity: '',
      costpp: '',
      ucost: '',
      sellp: '',
      stock: ''
    }
  }
  create = () => {
    this.props.navigation.goBack()
  }

  getProduct = (product: string) => {
    this.setState({ product })
  }

  getImage = (pic: any) => {
    this.setState((prevState: any) => ({
      image: {
        ...prevState.image,
        uri: pic
      }
    }))
  }

  getSQuantity = (squantity: any) => {
    this.setState({ squantity })
  }

  getPQuantity = (pquantity: any) => {
    this.setState({ pquantity })
  }

  getCostPP = (costpp: any) => {
    this.setState({ costpp })
  }

  getUCost = (ucost: any) => {
    this.setState({ ucost })
  }
  getSellP = (sellp: any) => {
    this.setState({ sellp })
  }
  getStock = (stock: any) => {
    this.setState({ stock })
  }

  updateState = (key: string, value: any) => {
    this.setState({ [key]: value })
  }
  render() {
    return (
      <ScrollView>
        <View>
          <ImageAtom getValue={this.getImage} source={this.state.image.uri} />
          <View>
            <InputAtom
              label="Product name"
              getValue={val => this.updateState('product', val)}
              contStyle={styles.marginlessInput}
              required={true}
            />
          </View>
          <View>
            <InputAtom
              label="Stock quantity"
              keyboardType="numeric"
              getValue={val => this.updateState('squantity', val)}
              contStyle={styles.marginlessInput}
            />
            <Text style={styles.font1}>Quantity available in store</Text>
          </View>
          <View>
            <InputAtom
              label="Unit cost price"
              keyboardType="numeric"
              getValue={this.getStock}
              contStyle={styles.marginlessInput}
            />
            <Text style={styles.font1}>
              Cost of 1 unit in a packing container e.g. N1 per liter
            </Text>
          </View>
          <View>
            <InputAtom
              label="Selling price"
              keyboardType="numeric"
              required={true}
              getValue={this.getStock}
              contStyle={styles.marginlessInput}
            />
          </View>
          <View>
            <InputAtom
              label="Minimum stock quantity"
              keyboardType="numeric"
              getValue={this.getStock}
              contStyle={styles.marginlessInput}
            />
            <Text style={styles.font1}>
              Minimum amount required for restock
            </Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  marginlessInput: {
    marginLeft: 0
  },
  font1: {
    fontSize: 11,
    color: '#000',
    paddingTop: 0,
    marginTop: 0
  },
  pickerStyle: {
    //  width: '50%',
    height: 35
  },
  addSign: {
    color: color.primary,
    fontSize: 50
  }
})
