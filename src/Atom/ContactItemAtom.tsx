import * as React from 'react'
import { ListItem, Left, Body, Right } from 'native-base'
import { StyleSheet } from 'react-native'

import { RegularText } from '../Atom/TextAtom'
import { color } from '../Style/Color'
import CachedImageAtom from './CachedImageAtom'

interface IProps {
  latestAmount: string
  realStyle: string
  onPress: () => void
  image: string
  contactName: string
  amount: any
}

class ContactItemAtom extends React.Component<IProps, any> {
  render() {
    return (
      <ListItem style={styles.row} onPress={this.props.onPress}>
        <Left style={styles.view1}>
          <CachedImageAtom uri={this.props.image} style={styles.dp} />
        </Left>
        <Body style={styles.view2}>
          <RegularText style={styles.rowText1}>
            {this.props.contactName}
          </RegularText>
        </Body>
        <Right style={styles.view3}>
          <RegularText style={styles.text1}>
            {'\u20A6'} {this.props.amount}
          </RegularText>
          <RegularText style={[styles.lilFont, styles[this.props.realStyle]]}>
            {this.props.latestAmount}
          </RegularText>
        </Right>
      </ListItem>
    )
  }
}

export default ContactItemAtom

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
    color: color.principal,
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
    fontWeight: '200',
    color: color.principal
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
