import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import InputAtom from './InputAtom'
import ButtonAtom from './ButtonAtom'
import Icon from '../Icon'
import { color } from '../../Style/Color'
import AsyncPickerAtom from './AsyncPickerAtom'
import { SearchProductsAndServicesByName } from '../../graphql/queries/store'

interface IRestockInput {
  productId?: string
  name?: string
  type?: string
  serviceId?: string
  quantity?: string
  unitPrice: string
}

interface IProps {
  products: IRestockInput[]
  error: string
  onUpdateItems: (items: any[]) => void
}

interface RestockItem {
  item: IRestockInput
  index: number
  handleValueChange: (index: number, key: string, value: any) => void
  onTrashItem: (index: number) => void
}

const AddRestockItems = (props: RestockItem) => (
  <View style={styles.productItemWrapper}>
    <Icon
      name="md-close"
      type="Ionicons"
      style={styles.closeIcon}
      onPress={() => props.onTrashItem(props.index)}
    />
    <AsyncPickerAtom
      placeholder={
        props.item.name.length > 0 ? props.item.name : 'Touch to choose'
      }
      type="single"
      selected={{
        id:
          props.item.type == 'product'
            ? props.item.productId
            : props.item.serviceId
      }}
      handleSelection={val => {
        props.handleValueChange(props.index, 'item', val)
      }}
      label={`Item ${props.index + 1}`}
      graphqlQuery={SearchProductsAndServicesByName}
      graphqlQueryResultKey="searchProductsAndServicesByName"
    />
    <View style={{ flexDirection: 'row' }}>
      <InputAtom
        label="Quantity"
        defaultValue={props.item.quantity}
        getValue={val => props.handleValueChange(props.index, 'quantity', val)}
        keyboardType="numeric"
        containerStyle={{ flex: 0.5 }}
      />
    </View>
  </View>
)

export default class AddRestockItemsList extends React.PureComponent<IProps> {
  handleValueChange = (index: number, key: string, value: any) => {
    const { products } = this.props
    let items = []

    let _item =
      key == 'item'
        ? {
            name: value.name,
            productId: value.type == 'Product' ? value.id : null,
            serviceId: value.type == 'Service' ? value.id : null,
            type: value.type.toLowerCase(),
            unitPrice: value.price
          }
        : { [key]: value }

    items = [
      ...products.slice(0, index),
      { ...products[index], ..._item },
      ...products.slice(index + 1)
    ]

    this.props.onUpdateItems(items)
  }

  addAnotherItem = () => {
    const restockItems = this.props.products.concat([
      {
        productId: null,
        serviceId: null,
        name: '',
        unitPrice: '0.00',
        type: ''
      }
    ])
    this.props.onUpdateItems(restockItems)
  }

  trashItem = index => {
    const { products } = this.props
    const items =
      products.length == 1
        ? []
        : [...products.slice(0, index), ...products.slice(index + 1)]
    this.props.onUpdateItems(items)
  }

  renderErrorText = () => {
    return this.props.error ? (
      <Text style={styles.errorText}>{this.props.error}</Text>
    ) : null
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderErrorText()}
        {this.props.products.map((item, index) => (
          <AddRestockItems
            key={index}
            index={index}
            item={item}
            handleValueChange={this.handleValueChange}
            onTrashItem={this.trashItem}
          />
        ))}
        <View style={styles.buttonWrapper}>
          <ButtonAtom
            btnText="Another Item"
            type="primary"
            onPress={this.addAnotherItem}
            icon="md-add"
            btnStyle={{
              borderWidth: 1.5,
              borderColor: color.button
            }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  productItemWrapper: {
    borderWidth: 1,
    borderColor: color.textBorderBottom,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderRadius: 5,
    marginBottom: 8,
    paddingTop: 8
  },
  closeIcon: {
    color: color.textColor,
    fontSize: 22,
    textAlign: 'right'
  },
  buttonWrapper: {
    alignSelf: 'flex-start',
    marginTop: 8
  },
  errorText: {
    marginLeft: 0,
    fontSize: 14,
    marginBottom: 2,
    marginTop: 0,
    fontFamily: 'AvenirNext-Regular',
    color: 'red',
    paddingVertical: 12
  }
})
