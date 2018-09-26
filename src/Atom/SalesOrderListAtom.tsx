import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { color } from '../Style/Color'
import { Left, Right } from 'native-base'

export interface DataProps {
  firstTopText: string
  bottomLeftFirstText?: string
  bottomLeftSecondText?: string
  topRightText: string
  bottomRightText?: string
}
interface IProps extends DataProps {
  onPress?: () => void
  style?: object
  rightTopTextStyle?: object
  leftStyle?: object
  rightStyle?: object
}

const renderStatusIndicator = (bottomRightText: string): JSX.Element => {
  let colour
  switch (bottomRightText) {
    case 'Pending': {
      colour = color.red
      break
    }
    case 'Delivered': {
      colour = color.selling
      break
    }
    case 'Delivering': {
      colour = color.active
      break
    }
    case 'Delivered | Recalled': {
      colour = color.yellow
      break
    }
    case 'Pending delivery': {
      colour = color.orange
      break
    }
    default:
  }
  return <View style={[styles.statusIndicator, { backgroundColor: colour }]} />
}

const SalesOrderListAtom = (props: IProps) => {
  return (
    <TouchableOpacity
      style={[styles.wrapper, props.style]}
      onPress={props.onPress}
    >
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
        <Text style={[styles.text, styles.top, props.rightTopTextStyle]}>
          {props.topRightText}
        </Text>
        <Text style={[styles.status, styles.bottom]}>
          {props.bottomRightText}
        </Text>
      </Right>
      {renderStatusIndicator(props.bottomRightText)}
    </TouchableOpacity>
  )
}

export default SalesOrderListAtom

const styles = StyleSheet.create({
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
    color: color.selling,
    fontFamily: 'Source Sans Pro'
  },
  rightWrapper: {
    marginRight: 16
  },
  leftWrapper: {
    marginLeft: 16
  },
  statusIndicator: {
    width: 5
  }
})
