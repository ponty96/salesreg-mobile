import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { color } from '../../Style/Color'
import { Left, Right, Thumbnail } from 'native-base'

export interface DataProps {
  firstTopText: string
  bottomLeftFirstText?: string
  bottomLeftSecondText?: string
  topRightText: string
  bottomRightText?: string
  avatar?: string
}
interface IProps extends DataProps {
  onPress?: () => void
  style?: object
  rightTopTextStyle?: object
  leftStyle?: object
  rightStyle?: object
}

const renderStatusIndicator = (bottomRightText: string): any => {
  let borderStyle: any = {
    borderRightWidth: 3
  }
  switch (bottomRightText) {
    case 'pending':
    case 'delivered':
    case 'delivering':
    case 'recalled':
    case 'processed':
      borderStyle = {
        ...borderStyle,
        borderRightColor: color[`${bottomRightText}BorderIndicator`]
      }
      break
    default:
      borderStyle = {}
      break
  }
  return borderStyle
}

const SalesOrderListAtom = (props: IProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.wrapper,
        props.style,
        renderStatusIndicator(props.bottomRightText)
      ]}
      onPress={props.onPress}
      key="SalesOrderListAtom-2"
    >
      {props.avatar && (
        <Thumbnail source={{ uri: props.avatar }} style={styles.avatar} />
      )}
      <Left style={[styles.leftWrapper, props.leftStyle]}>
        <Text style={[styles.serialNumber, styles.top]}>
          {props.firstTopText}
        </Text>
        <View style={styles.wrapperForTopLeft}>
          <Text style={[styles.text, styles.bottom]}>
            {props.bottomLeftFirstText}
          </Text>
          <Text style={[styles.time, styles.bottom]}>
            {props.bottomLeftSecondText}
          </Text>
        </View>
      </Left>
      <Right style={[styles.rightWrapper, props.rightStyle]}>
        <Text style={[styles.text, styles.top, styles.price]}>
          {props.topRightText}
        </Text>
        <Text style={[styles.status, styles.bottom]}>
          {props.bottomRightText}
        </Text>
      </Right>
    </TouchableOpacity>
  )
}

export default SalesOrderListAtom

const styles = StyleSheet.create({
  avatar: {
    height: 55,
    width: 55,
    marginTop: 0,
    paddingTop: 0,
    borderRadius: 55 / 2,
    margin: 0,
    padding: 0
  },
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: color.listBorderColor,
    flexDirection: 'row',
    marginHorizontal: 8,
    backgroundColor: color.secondary,
    marginVertical: 8
  },
  serialNumber: {
    fontFamily: 'AvenirNext-DemiBold',
    color: color.principal,
    fontSize: 16
  },
  wrapperForTopLeft: {
    flexDirection: 'row'
  },
  time: {
    marginLeft: 16,
    color: color.principal,
    fontFamily: 'AvenirNext-Regular',
    fontSize: 14
  },
  text: {
    fontFamily: 'AvenirNext-Regular',
    color: color.principal,
    fontSize: 14
  },
  bottom: {
    marginTop: 8,
    marginBottom: 8
  },
  top: {
    marginTop: 8
  },
  status: {
    // color: color.selling,
    fontFamily: 'AvenirNext-Regular'
  },
  rightWrapper: {
    marginRight: 16
  },
  leftWrapper: {
    marginLeft: 16
  },
  statusIndicator: {
    width: 5
  },
  price: {
    color: color.selling
  }
})
