import * as React from 'react'
import { ListItem, Left, Body, Thumbnail, Right } from 'native-base'
import { StyleSheet, Text } from 'react-native'
import { color } from '../Style/Color'

interface IProps {
  items: {
    image: string
    name: string
    number: any
    status?: string
    customer?: string
    price?: string
  }
  onPress?: () => void
  textStyle?: object
  topBodyTextStyle?: object
  numberTextStyle?: object
  priceStyle?: object
}

class ProductListAtom extends React.Component<IProps, any> {
  render() {
    const defaultImg =
      'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7'
    const avatar =
      this.props.items.image !== '' ? this.props.items.image : defaultImg
    const colored1 = this.props.items.status === 'debt' ? 'red' : color.button
    const colored2 =
      this.props.items.status === 'debt' ? 'red' : color.principal

    return (
      <ListItem style={styles.rowP} onPress={this.props.onPress}>
        <Left style={styles.leftView}>
          <Thumbnail source={{ uri: avatar }} style={styles.dpP} />
        </Left>
        <Body>
          <Text
            style={[
              styles.rowText1,
              { color: colored2 },
              this.props.topBodyTextStyle
            ]}
          >
            {this.props.items.name}
          </Text>
          {this.props.items.customer ? (
            <Text style={styles.bottomBodyText}>
              {this.props.items.customer}
            </Text>
          ) : (
            undefined
          )}
        </Body>
        <Right style={{ flex: 1 }}>
          <Text
            style={[
              styles.rowText1,
              { color: colored1 },
              this.props.numberTextStyle
            ]}
          >
            {this.props.items.number}
          </Text>
          {this.props.items.price ? (
            <Text style={[styles.bottomBodyText, this.props.priceStyle]}>
              {'\u20A6 '}
              {this.props.items.price}
            </Text>
          ) : (
            undefined
          )}
        </Right>
      </ListItem>
    )
  }
}

export default ProductListAtom

const styles = StyleSheet.create({
  rowP: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flex: 1,
    height: 75,
    paddingLeft: 0,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 0.5,
    maxWidth: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomColor: color.listBorderColor
  },
  rightText: {
    color: color.button,
    fontSize: 14,
    fontFamily: 'SourceSansPro'
  },
  rowText1: {
    fontSize: 14,
    fontFamily: 'SourceSansPro',
    textAlign: 'left',
    color: color.principal
  },
  leftView: {
    flex: 0,
    marginRight: 16
  },
  dpP: {
    height: 55,
    width: 55,
    marginTop: 0,
    paddingTop: 0,
    borderRadius: 55 / 2,
    margin: 8,
    paddingLeft: 8
  },
  bottomBodyText: {
    marginTop: 16,
    fontFamily: 'SourceSansPro',
    fontSize: 12,
    color: color.principal
  }
})
