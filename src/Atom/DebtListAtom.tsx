import * as React from 'react'
import { StyleSheet } from 'react-native'
import { ListItem, Text, Thumbnail, Left, Body, Right } from 'native-base'
import { color } from '../Style/Color'

interface IProps {
  items?: { images: string; customerName: string; amount: any; date: string }
  limit?: number
  onPress?: () => void
  image: string
}

class DebtListAtom extends React.Component<IProps, any> {
  public static defaultProps = {
    image:
      'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7'
  }

  display = () => {
    const DUMMY_LIMIT = 200000
    if (this.props.limit >= DUMMY_LIMIT) {
      return (
        <Text style={styles.rowText1D}>{this.props.items.customerName}</Text>
      )
    } else {
      return (
        <Text style={styles.rowText1}>{this.props.items.customerName}</Text>
      )
    }
  }

  render() {
    const AVATAR =
      this.props.items.images !== ''
        ? this.props.items.images
        : this.props.image

    return (
      <ListItem style={styles.row} onPress={this.props.onPress}>
        <Left style={styles.view1}>
          <Thumbnail source={{ uri: AVATAR }} style={styles.dp} />
        </Left>
        <Body style={styles.view2}>{this.display()}</Body>
        <Right style={styles.view3}>
          <Text style={styles.rowText3D}>
            {'\u20A6'} {this.props.items.amount}.00
          </Text>
          <Text style={styles.lilFontD}>{this.props.items.date}</Text>
        </Right>
      </ListItem>
    )
  }
}

export default DebtListAtom

const styles = StyleSheet.create({
  rowText1D: {
    fontWeight: '400',
    fontSize: 13,
    color: '#000',
    textAlign: 'left'
  },
  rowText1: {
    fontWeight: '400',
    fontSize: 13,
    // color: '#000',
    textAlign: 'left'
  },
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
  view1: {
    height: 68,
    width: '20%',
    alignItems: 'center'
  },
  dp: {
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    margin: 8
  },
  view2: {
    flex: 0,
    paddingLeft: 0,
    marginLeft: 0,
    paddingRight: 0,
    marginRight: 0,
    width: '35%'
  },
  view3: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '35%',
    marginLeft: '20%'
  },
  rowText3D: {
    color: 'rgba(218,11,11,59)',
    fontSize: 13,
    textAlign: 'right',
    paddingRight: 5,
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 15
  },
  lilFontD: {
    fontSize: 12,
    paddingRight: 8
  }
})
