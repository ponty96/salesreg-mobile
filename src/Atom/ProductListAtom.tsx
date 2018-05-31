import * as React from 'react'
import { ListItem, Left, Body, Right, Text, Thumbnail } from 'native-base'
import { StyleSheet } from 'react-native'

interface IProps {
  items: { images: string; name: string; number: any }
  onPress?: () => void
}

class ProductListAtom extends React.Component<IProps, any> {
  render() {
    const defaultImg =
      'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7'
    const avatar =
      this.props.items.images !== '' ? this.props.items.images : defaultImg

    return (
      <ListItem style={styles.rowP} onPress={this.props.onPress}>
        <Left style={styles.leftView}>
          <Thumbnail source={{ uri: avatar }} style={styles.dpP} />
        </Left>
        <Body style={styles.bodyView}>
          <Text style={styles.rowText1}>{this.props.items.name}</Text>
        </Body>
        <Right style={styles.rightView}>
          <Text style={styles.rowText3P}> {this.props.items.number}</Text>
        </Right>
      </ListItem>
    )
  }
}

export default ProductListAtom

const styles = StyleSheet.create({
  rowP: {
    flexDirection: 'row',
    flex: 1,
    top: 0,
    height: 75,
    paddingLeft: 0,
    marginLeft: 0,
    // backgroundColor: '#fff',
    marginBottom: 0.5,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  rowText3P: {
    color: '#B10000',
    fontSize: 13,
    textAlign: 'right',
    paddingRight: 5,
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 15
  },
  rowText1: {
    fontWeight: '400',
    fontSize: 13,
    // color: '#000',
    textAlign: 'left'
  },
  leftView: {
    height: 55
  },
  bodyView: {
    flex: 3
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
  rightView: {
    alignSelf: 'flex-end',
    alignItems: 'center'
  }
})
