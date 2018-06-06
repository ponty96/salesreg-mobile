import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ListItem, Left, Right } from 'native-base'

interface IProps {
  total?: string
  amount?: string
  balance?: string
  dueDate?: string
}

export default class BottomOrderDetailAtom extends React.Component<
  IProps,
  any
> {
  static defaultProps: IProps = {
    total: '0'
  }
  render() {
    return (
      <View>
        <ListItem style={styles.redList}>
          <Left>
            <Text style={styles.whiteTextL}>TOTAL</Text>
          </Left>
          <Right>
            <Text style={styles.whiteTextR}>
              {'\u20A6'} {this.props.total}.00
            </Text>
          </Right>
        </ListItem>
        <ListItem style={styles.whiteList}>
          <Left>
            <Text style={styles.blackTextL}>Amount Pending</Text>
          </Left>
          <Right>
            <Text style={styles.blackTextR}>
              {'\u20A6'} {this.props.amount}.00
            </Text>
          </Right>
        </ListItem>
        <ListItem style={styles.whiteList}>
          <Left>
            <Text style={styles.blackTextL}>Balance</Text>
          </Left>
          <Right>
            <Text style={styles.redTextR}>
              {'\u20A6'} {this.props.balance}.00
            </Text>
          </Right>
        </ListItem>
        <ListItem style={styles.whiteList}>
          <Left>
            <Text style={styles.blackTextL}>Balance due date</Text>
          </Left>
          <Right>
            <Text style={styles.blackTextR}>{this.props.dueDate}.</Text>
          </Right>
        </ListItem>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  redList: {
    height: 65,
    width: '100%',
    backgroundColor: 'red',
    paddingLeft: 0,
    marginLeft: 0
  },

  whiteTextL: {
    fontSize: 16,
    color: '#FFF',
    paddingLeft: 16
  },

  whiteTextR: {
    fontSize: 16,
    color: '#FFF'
  },

  whiteList: {
    height: 65,
    width: '100%',
    backgroundColor: '#FFF',
    paddingLeft: 0,
    marginLeft: 0
  },

  blackTextL: {
    fontSize: 16,
    color: '#c0c0c0',
    paddingLeft: 16
  },

  blackTextR: {
    fontSize: 16,
    color: '#000'
  },

  redTextR: {
    fontSize: 16,
    color: 'red'
  }
})
