import React, { Component } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import ListItemAtom from '../../Atom/ListItem/ListItemAtom'
import { color } from '../../Style/Color'
import Icon from '../../Atom/Icon'
import { GreenCanvas } from '../../Atom/GreenCanvas'
import FabAtom from '../../Atom/FabAtom'

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
  hideTotal?: boolean
  showFab?: boolean
  fabRouteName?: string
  navigation?: any
  fabIconName?: string
  fabIconType?: string
}

const renderStatusIndicator = (bottomRightText: string): any => {
  let borderStyle: any = {
    borderLeftWidth: 4
  }
  switch (bottomRightText) {
    case 'pending':
    case 'delivered':
    case 'delivering':
    case 'recalled':
    case 'processed':
      borderStyle = {
        ...borderStyle,
        borderLeftColor: color[`${bottomRightText}BorderIndicator`]
      }
      break
    default:
      borderStyle = {}
      break
  }
  return borderStyle
}

export default class GenericDetailsComponent extends Component<IProps> {
  static defaultProps = {
    hideTotal: false,
    showFab: false
  }

  getItems = () => {
    const { items, totalAmount } = this.props
    if (this.props.hideTotal) {
      return items
    } else {
      return items.concat([
        {
          itemTitle: 'TOTAL',
          itemValue: totalAmount,
          isTotalAmount: true
        }
      ])
    }
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
    const {
      title,
      totalAmount,
      fabRouteName,
      navigation,
      fabIconName,
      fabIconType
    } = this.props

    return (
      <View style={styles.container}>
        <GreenCanvas title={title} subText={totalAmount} />
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
        {this.props.showFab && (
          <FabAtom
            routeName={fabRouteName}
            navigation={navigation}
            name={fabIconName}
            type={fabIconType}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
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
