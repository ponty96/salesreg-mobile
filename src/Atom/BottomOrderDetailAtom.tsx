import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { ListItem, Left, Right } from 'native-base'

import { RegularText } from '../Atom/TextAtom'

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
            <RegularText style={styles.whiteTextL}>TOTAL</RegularText>
          </Left>
          <Right>
            <RegularText style={styles.whiteTextR}>
              {'\u20A6'} {this.props.total}.00
            </RegularText>
          </Right>
        </ListItem>
        <ListItem style={styles.whiteList}>
          <Left>
            <RegularText style={styles.blackTextL}>Amount Pending</RegularText>
          </Left>
          <Right>
            <RegularText style={styles.blackTextR}>
              {'\u20A6'} {this.props.amount}.00
            </RegularText>
          </Right>
        </ListItem>
        <ListItem style={styles.whiteList}>
          <Left>
            <RegularText style={styles.blackTextL}>Balance</RegularText>
          </Left>
          <Right>
            <RegularText style={styles.redTextR}>
              {'\u20A6'} {this.props.balance}.00
            </RegularText>
          </Right>
        </ListItem>
        <ListItem style={styles.whiteList}>
          <Left>
            <RegularText style={styles.blackTextL}>
              Balance due date
            </RegularText>
          </Left>
          <Right>
            <RegularText style={styles.blackTextR}>
              {this.props.dueDate}.
            </RegularText>
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
