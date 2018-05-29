import * as React from 'react'
import { Text, StyleSheet } from 'react-native'
import { ListItem, Left, Right } from 'native-base'
import { color } from '../Style/Color'

interface IProps {
  items?: { name: string; number: number; amount: any }
}

class OrderDetailListAtom extends React.Component<IProps, any> {
  render() {
    return (
      <ListItem style={styles.row}>
        <Left>
          <Text style={styles.leftText}>{this.props.items.name}</Text>
        </Left>
        <Right>
          <Text style={styles.rightText1}>{this.props.items.number}</Text>
          <Text style={styles.rightText2}>#{this.props.items.amount}.00</Text>
        </Right>
      </ListItem>
    )
  }
}

export default OrderDetailListAtom

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    top: 0,
    padding: 10,
    paddingLeft: 0,
    marginLeft: 0,
    height: 75,
    // backgroundColor: '#fff',
    marginBottom: 0.5,
    borderBottomWidth: 0.5,
    borderBottomColor: color.listBorderColor,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  leftText: {
    color: '#c0c0c0',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'left',
    paddingLeft: 16
  },
  rightText1: {
    color: '#000',
    fontSize: 14,
    paddingBottom: 8
  },
  rightText2: {
    color: 'red',
    fontSize: 14,
    paddingTop: 8
  }
})
