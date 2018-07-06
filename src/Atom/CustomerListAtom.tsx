import * as React from 'react'
import { ListItem, Text, Thumbnail, Left, Body, Right } from 'native-base'
import { StyleSheet } from 'react-native'
import { color } from '../Style/Color'

interface IProps {
  items?: { images: string; customerName: string; amount: any }
  latestAmount: string
  realStyle: string
  onPress: () => void
}

class CustomerListAtom extends React.Component<IProps, any> {
  render() {
    const defaultImg =
      'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7'
    const avatar =
      this.props.items.images !== '' ? this.props.items.images : defaultImg
    let paid = 'paid'
    let balance = 'balance'
    return (
      <ListItem style={styles.row} onPress={this.props.onPress}>
        <Left style={styles.view1}>
          <Thumbnail source={{ uri: avatar }} style={styles.dp} />
        </Left>
        <Body style={styles.view2}>
          <Text style={styles.rowText1}>{this.props.items.customerName}</Text>
        </Body>
        <Right style={styles.view3}>
          <Text style={styles.text1}>
            {'\u20A6'} {this.props.items.amount}
          </Text>
          <Text
            style={[
              styles.lilFont,
              this.props.realStyle === paid
                ? styles.paid
                : this.props.realStyle === balance
                  ? styles.balance
                  : styles.debt
            ]}
          >
            {this.props.latestAmount}
          </Text>
        </Right>
      </ListItem>
    )
  }
}

export default CustomerListAtom

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    paddingLeft: 0,
    marginLeft: 16,
    marginRight: 16,
    height: 75,
    // backgroundColor: '#fff',
    marginBottom: 0.5,
    maxWidth: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: color.listBorderColor,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  view1: {
    height: 68,
    width: '20%',
    alignItems: 'center'
  },
  view2: {
    flex: 0,
    paddingLeft: 0,
    marginLeft: 0,
    paddingRight: 0,
    marginRight: 0,
    width: '35%'
  },
  rowText1: {
    fontWeight: '400',
    fontSize: 13,
    // color: '#000',
    textAlign: 'left'
  },
  dp: {
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    margin: 8
  },
  view3: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '35%',
    marginLeft: '20%'
  },
  text1: {
    fontSize: 13,
    fontWeight: '200'
  },
  lilFont: {
    fontSize: 12
  },
  paid: {
    fontSize: 12,
    color: '#c0c0c0'
  },
  balance: {
    fontSize: 12,
    color: '#42c5f4'
  },
  debt: {
    fontSize: 12,
    color: 'rgba(218,11,11,59)'
  }
})
