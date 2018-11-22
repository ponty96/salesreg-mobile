import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Content } from 'native-base'
import InputAtom from './InputAtom'
import PickerAtom from './PickerAtom'
import ButtonAtom from './ButtonAtom'
import Icon from '../Icon'
import { color } from '../../Style/Color'
import { numberWithCommas } from '../../Functions/numberWithCommas'

interface IProps {
  salesItems: any[]
  onUpdateItems: (items: any[]) => void
}

interface SalesItem {
  itemName: string
  amount: string
  quantity: string
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
    <PickerAtom
      label={`Item ${props.index + 1}`}
      placeholder="Touch to choose"
      list={[{}]}
      selected={props.itemName}
      handleSelection={val =>
        props.handleValueChange(props.index, 'itemName', val)
      }
    />
    <View style={styles.salesInputRow}>
      <InputAtom
        label="Quantity"
        placeholder="0"
        defaultValue={props.quantity}
        getValue={val => props.handleValueChange(props.index, 'quantity', val)}
        contStyle={styles.salesInput}
        containerStyle={{ flex: 1 }}
      />
      <InputAtom
        label={`Price/each(\u20A6)`}
        placeholder="0.00"
        defaultValue={props.amount}
        getValue={val => props.handleValueChange(props.index, 'amount', val)}
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
            (Number(props.amount) * Number(props.quantity)).toFixed(2)
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
    if (salesItems.length == 1) {
      items = [{ ...salesItems[0], [key]: value }]
    } else {
      items = [
        ...salesItems.slice(0, index),
        { ...salesItems[index], [key]: value },
        ...salesItems.slice(index + 1)
      ]
    }
    this.props.onUpdateItems(items)
  }

  addAnotherItem = () => {
    const expenseItems = this.props.salesItems.concat([
      {
        amount: '',
        itemName: '',
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Content>
          {this.props.salesItems.map((item, index) => (
            <AddSalesOrderItem
              key={index}
              index={index}
              itemName={item}
              amount={item.amount}
              quantity={item.quantity}
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
        </Content>
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
    marginBottom: 8,
    paddingTop: 8
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
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    marginLeft: 30,
    flex: 1
  }
})
