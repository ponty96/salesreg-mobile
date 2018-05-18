import * as React from 'react'
import { ListItem, Text, Thumbnail, Left, Body, Right } from 'native-base'
import styles from './../Style/ProductAndCustomerList'

interface IProps {
  items?: { images: string; customerName: string; amount: string }
  latestAmount: string
  realStyle: string
  onPress?: () => void
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
          <Text style={styles.text1}>N {this.props.items.amount}</Text>
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
