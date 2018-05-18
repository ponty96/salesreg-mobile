import * as React from 'react'
import { Text } from 'react-native'
import { ListItem, Left, Right } from 'native-base'
import styles from '../Style/ProductAndCustomerList'

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
