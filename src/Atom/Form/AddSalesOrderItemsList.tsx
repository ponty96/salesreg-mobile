import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import InputAtom from './InputAtom'
import AsyncPickerAtom from './AsyncPickerAtom'
import ButtonAtom from './ButtonAtom'
import Icon from '../Icon'
import { SearchProductsAndServicesByName } from '../../graphql/queries/store'
import { color } from '../../Style/Color'
import { numberWithCommas } from '../../Functions/numberWithCommas'

interface ISalesInput {
  productId?: string
  quantity: string
  name?: string
  type?: string
  serviceId?: string
  unitPrice: string
}

interface IProps {
  salesItems: ISalesInput[]
  error: string
  onUpdateItems: (items: ISalesInput[]) => void
}

interface SalesItem {
  item: ISalesInput
  index: number
  handleValueChange: (index: number, key: string, value: any) => void
  onTrashItem: (index: number) => void
}

const AddSalesOrderItem = (props: SalesItem) => (
  <View style={styles.salesItemWrapper}>
    <Icon
      name="md-close"
      type="Ionicons"
      style={styles.closeIcon}
      onPress={() => props.onTrashItem(props.index)}
    />
    <AsyncPickerAtom
      graphqlQuery={SearchProductsAndServicesByName}
      graphqlQueryResultKey="searchProductsAndServicesByName"
      label={`Item ${props.index + 1}`}
      type="single"
      placeholder={
        props.item.name.length > 0 ? props.item.name : 'Touch to choose'
      }
      selected={{
        id:
          props.item.type == 'product'
            ? props.item.productId
            : props.item.serviceId
      }}
      handleSelection={val => {
        props.handleValueChange(props.index, 'item', val)
      }}
      emptySection={{
        emptyText:
          'At least one product/service needs to be created to make a sales order'
      }}
    />
    <View style={styles.salesInputRow}>
      <InputAtom
        label="Quantity"
        placeholder="0"
        defaultValue={props.item.quantity}
        getValue={val => props.handleValueChange(props.index, 'quantity', val)}
        contStyle={styles.salesInput}
        containerStyle={{ flex: 1 }}
      />
      <InputAtom
        label={`Price/each(\u20A6)`}
        editable={false}
        placeholder="0.00"
        defaultValue={numberWithCommas(props.item.unitPrice)}
        getValue={val => props.handleValueChange(props.index, 'unitPrice', val)}
        containerStyle={{ flex: 1 }}
        contStyle={StyleSheet.flatten([
          styles.salesInput,
          { marginLeft: 10, marginRight: 0 }
        ])}
      />
    </View>
    <View style={styles.salesInputRow}>
      <Text style={styles.text}>{`Amt(\u20A6)`}</Text>
      <View style={styles.totalAmtContainer}>
        <Text style={[styles.text, { fontSize: 18 }]}>
          {numberWithCommas(
            (
              Number(props.item.unitPrice) * Number(props.item.quantity)
            ).toFixed(2)
          ) || 0.0}
        </Text>
      </View>
    </View>
  </View>
)

export default class AddSalesOrderItemsList extends React.PureComponent<
  IProps
> {
  handleValueChange = (index: number, key: string, value: any) => {
    const { salesItems } = this.props
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
      ...salesItems.slice(0, index),
      { ...salesItems[index], ..._item },
      ...salesItems.slice(index + 1)
    ]

    this.props.onUpdateItems(items)
  }

  addAnotherItem = () => {
    const expenseItems = this.props.salesItems.concat([
      {
        productId: null,
        serviceId: null,
        name: '',
        unitPrice: '0.00',
        type: '',
        quantity: ''
      }
    ])
    this.props.onUpdateItems(expenseItems)
  }

  trashItem = index => {
    const { salesItems } = this.props
    const items =
      salesItems.length == 1
        ? []
        : [...salesItems.slice(0, index), ...salesItems.slice(index + 1)]
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
        {this.props.salesItems.map((item, index) => (
          <AddSalesOrderItem
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
  salesItemWrapper: {
    borderWidth: 1,
    borderColor: color.textBorderBottom,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderRadius: 5,
    marginTop: 24,
    paddingTop: 8
  },
  errorText: {
    marginLeft: 0,
    fontSize: 14,
    marginBottom: 2,
    marginTop: 0,
    fontFamily: 'AvenirNext-Regular',
    color: 'red',
    paddingVertical: 12
  },
  closeIcon: {
    color: color.textColor,
    fontSize: 22,
    textAlign: 'right'
  },
  salesInputRow: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    width: '100%'
  },
  buttonWrapper: {
    alignSelf: 'flex-start',
    marginTop: 8
  },
  itemPicker: {
    marginTop: 0
  },
  salesInput: {
    marginLeft: 0,
    marginTop: 0,
    marginRight: 10
  },
  text: {
    fontSize: 15,
    color: color.textColor,
    fontFamily: 'AvenirNext-DemiBold'
  },
  totalAmtContainer: {
    borderRadius: 5,
    backgroundColor: color.grey,
    height: 56,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    marginLeft: 30,
    flex: 1
  }
})
