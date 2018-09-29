import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity
} from 'react-native'
import ListItemAtom from '../../Atom/ListItemAtom'
import { color } from '../../Style/Color'
import Icon from '../../Atom/Icon'

interface Item {
  itemTitle: string
  itemValue: string
  isTotalAmount?: boolean
  itemQuantity?: string
}
interface IProps {
  title: string
  totalAmount: string
  items: Item[]
  shouldShowStatus?: boolean
  status?: string
  onPressStatus?: () => void
  onTrash?: () => void
}

const renderStatusIndicator = (bottomRightText: string): any => {
  let borderStyle: any = {
    borderLeftWidth: 4
  }
  switch (bottomRightText) {
    case 'pending': {
      borderStyle = {
        ...borderStyle,
        borderLeftColor: color.pendingBorderIndicator
      }
      break
    }
    case 'delivered': {
      borderStyle = {
        ...borderStyle,
        borderLeftColor: color.deliveredBorderIndicator
      }
      break
    }
    case 'delivering': {
      borderStyle = {
        ...borderStyle,
        borderLeftColor: color.inDeliveryBorderIndicator
      }
      break
    }
    case 'delivered | recalled':
    case 'recalled':
      borderStyle = {
        ...borderStyle,
        borderLeftColor: color.deliveredBorderIndicator
      }
      break
    case 'processed': {
      borderStyle = {
        ...borderStyle,
        borderLeftColor: color.processedBorderIndicator
      }
      break
    }
    default:
      borderStyle = {}
      break
  }
  return borderStyle
}

export default class GenericDetailsComponent extends Component<IProps> {
  getItems = () => {
    const { items, totalAmount } = this.props
    return items.concat([
      {
        itemTitle: 'TOTAL',
        itemValue: totalAmount,
        isTotalAmount: true
      }
    ])
  }
  renderItem = ({ item }: any) =>
    item.itemTitle == 'Status' ? (
      this.statusListItem(item)
    ) : (
      <ListItemAtom
        label={item.itemTitle}
        value={item.itemValue}
        quantity={item.itemQuantity}
        labelStyle={item.isTotalAmount ? styles.whiteLabel : styles.listLabel}
        rightTextStyle={
          item.isTotalAmount ? styles.whiteLabel : styles.greenText
        }
        listItemStyle={
          item.isTotalAmount ? styles.totalAmountListItem : styles.listWrapper
        }
      />
    )

  statusListItem = item => {
    return (
      <TouchableOpacity onPress={this.props.onPressStatus}>
        <ListItemAtom
          label={item.itemTitle}
          value={item.itemValue}
          quantity={item.itemQuantity}
          labelStyle={styles.listLabel}
          rightTextStyle={styles.blueText}
          listItemStyle={[
            styles.listWrapper,
            renderStatusIndicator(item.itemValue)
          ]}
          icon={
            <Icon
              name="chevron-small-right"
              type="Entypo"
              style={{ color: color.button, fontSize: 20, marginTop: 8 }}
            />
          }
        />
      </TouchableOpacity>
    )
  }

  render() {
    const { title, totalAmount } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.detailsHeader}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.amount}>{`\u20A6 ${totalAmount}`}</Text>
        </View>
        <FlatList
          data={this.getItems()}
          style={{ height: 310 }}
          renderItem={this.renderItem}
          keyExtractor={(item: any) => item.id}
        />
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}
          onPress={this.props.onTrash}
        >
          <Icon
            type="EvilIcons"
            name="trash"
            style={{ color: color.textBorderBottom, fontSize: 60 }}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  detailsHeader: {
    backgroundColor: color.amountSummaryBg,
    paddingVertical: 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontFamily: 'AvenirNext-Medium',
    paddingBottom: 8,
    color: '#fff'
  },
  amount: {
    fontSize: 22,
    fontFamily: 'AvenirNext-Bold',
    color: '#fff'
  },
  listLabel: {
    color: color.textColor,
    marginLeft: 2,
    fontFamily: 'AvenirNext-Regular'
  },
  listWrapper: {
    borderBottomColor: color.listBorderColor,
    borderBottomWidth: 1,
    paddingLeft: 24,
    paddingRight: 24
  },
  greenText: {
    color: color.selling,
    fontFamily: 'AvenirNext-Regular'
  },
  totalAmountListItem: {
    backgroundColor: color.selling,
    paddingLeft: 24,
    paddingRight: 24
  },
  whiteLabel: {
    color: '#fff',
    fontFamily: 'AvenirNext-DemiBold'
  },
  blueText: {
    color: color.button,
    fontFamily: 'AvenirNext-Regular'
  }
})
