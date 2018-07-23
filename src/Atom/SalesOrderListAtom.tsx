import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { color } from '../Style/Color'
import { Left, Right } from 'native-base'

interface IProps {
  firstTopLeftText: string
  bottomLeftText: string
  secondTopLeftText?: string
  topRightText: number
  bottomRightText: string
  onPress?: () => void
  style?: object
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

const salesOrderListAtom = (props: IProps) => {
  return (
    <TouchableOpacity
      style={[styles.wrapper, props.style]}
      onPress={props.onPress}
    >
      <Left style={styles.leftWrapper}>
        <View style={styles.wrapperForTopLeft}>
          <Text style={[styles.serialNumber, styles.top]}>
            {props.firstTopLeftText}
          </Text>
          <Text style={[styles.time, styles.top]}>
            {props.secondTopLeftText}
          </Text>
        </View>
        <Text style={[styles.text, styles.bottom]}>{props.bottomLeftText}</Text>
      </Left>
      <Right style={styles.rightWrapper}>
        <Text style={[styles.text, styles.top]}>{props.topRightText}</Text>
        <Text style={[styles.status, styles.bottom]}>
          {props.bottomRightText}
        </Text>
      </Right>
      {renderStatusIndicator(props.bottomRightText)}
    </TouchableOpacity>
  )
}

export default salesOrderListAtom

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
    fontFamily: 'SourceSansPro_Semibold',
    color: color.principal
  },
  wrapperForTopLeft: {
    flexDirection: 'row'
  },
  time: {
    marginLeft: 16,
    color: color.principal,
    fontFamily: 'SourceSansPro'
  },
  text: {
    fontFamily: 'SourceSansPro',
    color: color.principal
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
    fontFamily: 'SourceSansPro'
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
