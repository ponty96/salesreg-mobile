import * as React from 'react'
import { ListItem, Left, Body, Right, Text, Thumbnail } from 'native-base'
import { StyleSheet } from 'react-native'
import { color } from '../Style/Color'

interface IProps {
  items: { images: string; name: string; number: any; status: string }
  onPress?: () => void
}

class ProductListAtom extends React.Component<IProps, any> {
  render() {
    const defaultImg =
      'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7'
    const avatar =
      this.props.items.images !== '' ? this.props.items.images : defaultImg
    const colored1 = this.props.items.status === 'debt' ? 'red' : color.button
    const colored2 = this.props.items.status === 'debt' ? 'red' : 'black'
    console.log(this.props.items.status)
    return (
      <ListItem style={styles.rowP} onPress={this.props.onPress}>
        <Left style={styles.leftView}>
          <Thumbnail source={{ uri: avatar }} style={styles.dpP} />
        </Left>
        <Body style={styles.bodyView}>
          <Text style={[styles.rowText1, { color: colored2 }]}>
            {this.props.items.name}
          </Text>
        </Body>
        <Right style={styles.rightView}>
          <Text style={[styles.rowText3P, { color: colored1 }]}>
            {this.props.items.number}
          </Text>
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
    flex: 1,
    height: 75,
    paddingLeft: 0,
<<<<<<< HEAD
    marginLeft: 0,
=======
    marginLeft: 16,
    marginRight: 16,
    // backgroundColor: '#fff',
>>>>>>> d0f1f9feb074c0a0cbe94227fd41cbd70841815c
    marginBottom: 0.5,
    maxWidth: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  rowText3P: {
    color: color.button,
    fontSize: 16,
    textAlign: 'right',
    paddingRight: 5,
    fontFamily: 'SourceSansPro_Semibold',
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 15
  },
  rowText1: {
    fontWeight: '400',
    fontSize: 14,
    fontFamily: 'SourceSansPro',
    textAlign: 'left'
  },
  leftView: {
    height: 55,
    marginLeft: 0
  },
  bodyView: {
    flex: 2
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
    flex: 1
  }
})
