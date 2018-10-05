import React from 'react'
import { View, StyleSheet } from 'react-native'
import InputAtom from '../InputAtom'
import ButtonAtom from '../ButtonAtom'
import Icon from '../Icon'
import { color } from '../../Style/Color'

interface ExpenseItem {
  itemName: string
  amount: string
  index: number
  handleValueChange: (index: number, key: string, value: any) => void
  onTrashItem: (index: number) => void
}
interface IProps {
  expenseItems: any[]
  onUpdateItems: (items: any[]) => void
}

const AddExpenseItem = (props: ExpenseItem) => (
  <View style={styles.expenseItemWrapper}>
    <Icon
      name="md-close"
      type="Ionicons"
      style={styles.closeIcon}
      onPress={() => props.onTrashItem(props.index)}
    />
    <InputAtom
      label={`Item ${props.index + 1}`}
      placeholder="e.g item placeholder"
      defaultValue={props.itemName}
      getValue={val => props.handleValueChange(props.index, 'itemName', val)}
      contStyle={styles.expenseItemTitleInput}
    />
    <InputAtom
      label={`Amount(\u20A6) allocated to this item`}
      placeholder={`\u20A6 0.0`}
      defaultValue={`${props.amount}`}
      getValue={val =>
        props.handleValueChange(
          props.index,
          'amount',
          parseFloat(`${val || 0}`).toFixed(2)
        )
      }
      keyboardType="numeric"
    />
  </View>
)

export default class AddExpenseItemsList extends React.Component<IProps> {
  handleValueChange = (index: number, key: string, value: any) => {
    const { expenseItems } = this.props
    let items = []
    if (expenseItems.length == 1) {
      items = [{ ...expenseItems[0], [key]: value }]
    } else {
      items = [
        ...expenseItems.slice(0, index),
        { ...expenseItems[index], [key]: value },
        ...expenseItems.slice(index + 1)
      ]
    }
    this.props.onUpdateItems(items)
  }
  addAnotherItem = () => {
    const expenseItems = this.props.expenseItems.concat([
      {
        amount: 0.0,
        itemName: ''
      }
    ])
    this.props.onUpdateItems(expenseItems)
  }
  trashItem = index => {
    const { expenseItems } = this.props
    const items =
      expenseItems.length == 1
        ? []
        : [...expenseItems.slice(0, index), ...expenseItems.slice(index + 1)]
    this.props.onUpdateItems(items)
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.expenseItems.map((item, index) => (
          <AddExpenseItem
            key={index}
            itemName={item.itemName}
            amount={item.amount}
            index={index}
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
  expenseItemWrapper: {
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
  expenseItemTitleInput: {
    marginTop: 0,
    marginLeft: 4
  },
  buttonWrapper: {
    alignSelf: 'flex-start',
    marginTop: 8
  }
})