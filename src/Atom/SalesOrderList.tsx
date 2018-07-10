import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { color } from '../Style/Color'
import { Left, Right } from 'native-base'

interface IProps {
  serialNumber: string
  name: string
  time: string
  num: number
  status: string
}

const renderStatusIndicator = (status: string): JSX.Element => {
  let colour
  switch (status) {
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
      console.log('Status not present.')
  }
  return <View style={[styles.statusIndicator, { backgroundColor: colour }]} />
}

const salesOrderList = (props: IProps) => {
  return (
    <View style={styles.wrapper}>
      <Left style={styles.leftWrapper}>
        <View style={styles.wrapperForTopLeft}>
          <Text style={[styles.serialNumber, styles.top]}>
            {props.serialNumber}
          </Text>
          <Text style={[styles.time, styles.top]}>{props.time}</Text>
        </View>
        <Text style={[styles.text, styles.bottom]}>{props.name}</Text>
      </Left>
      <Right style={styles.rightWrapper}>
        <Text style={[styles.text, styles.top]}>{props.num}</Text>
        <Text style={[styles.status, styles.bottom]}>{props.status}</Text>
      </Right>
      {renderStatusIndicator(props.status)}
    </View>
  )
}

export default salesOrderList

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: color.listBorderColor,
    flexDirection: 'row',
    marginHorizontal: 8,
    backgroundColor: color.grey,
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
