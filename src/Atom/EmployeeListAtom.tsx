import * as React from 'react'
import { ListItem, View, Left, Body, Right } from 'native-base'
import { StyleSheet } from 'react-native'

import { DemiBoldText, RegularText, BoldText } from '../Atom/TextAtom'
import { color } from '../Style/Color'
import { capitalizeFirstLetter } from '../Functions/capitalizeFirstLetter'
import GoldRatings from './GoldRatingsAtom'
import CachedImageAtom from './CachedImageAtom'

interface IProps {
  items?: {
    image: string
    customerName: string
    location: string
    position: string
  }
  onPress: () => void
}

class EmployeeListAtom extends React.Component<IProps, any> {
  renderAvatar = () => {
    const defaultImg =
      'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7'
    const avatar =
      this.props.items.image !== '' ? this.props.items.image : defaultImg
    if (this.props.items.image === '') {
      return (
        <View style={styles.textIconCont}>
          <BoldText style={{ fontSize: 25 }}>
            {capitalizeFirstLetter(this.props.items.customerName)}
          </BoldText>
        </View>
      )
    } else {
      return <CachedImageAtom uri={avatar} style={styles.dp} />
    }
  }
  render() {
    return (
      <ListItem style={styles.row} onPress={this.props.onPress}>
        <Left style={styles.view1}>{this.renderAvatar()}</Left>
        <Body style={styles.view2}>
          <DemiBoldText style={styles.textCus}>
            {this.props.items.customerName}
          </DemiBoldText>
          <RegularText style={styles.textLoc}>
            {this.props.items.location}
          </RegularText>
        </Body>
        <Right style={styles.view3}>
          <DemiBoldText style={styles.textPos}>
            {this.props.items.position}
          </DemiBoldText>
          <GoldRatings showText={false} />
        </Right>
      </ListItem>
    )
  }
}

export default EmployeeListAtom

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
    width: '40%',
    marginLeft: '20%'
  },
  textIconCont: {
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    backgroundColor: color.textBorderBottom,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textCus: {
    fontSize: 14
  },
  textLoc: {
    fontSize: 14
  },
  textPos: {
    fontSize: 16
  }
})
