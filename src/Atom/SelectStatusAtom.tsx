import React from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import { color } from '../Style/Color'
import RadioButton from './Form/SingeRadioButton'

const renderStatusIndicator = (bottomRightText: string): any => {
  let borderStyle: any = {
    borderRightWidth: 6
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

interface IProps {
  title: string
  indicatorColor: object
  selected: boolean
  styleWrapper?: object
  onPress?: any
  status: string
}

const SelectStatusAtom = (props: IProps): JSX.Element => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.wrapper, renderStatusIndicator(props.status)]}>
        <RadioButton
          animation={'bounceIn'}
          isSelected={props.selected}
          innerColor={color.green}
          outerColor={color.green}
          size={13}
          onPress={props.onPress}
        />
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default SelectStatusAtom

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: color.listBorderColor,
    flexDirection: 'row',
    backgroundColor: color.secondary,
    marginVertical: 8,
    paddingVertical: 20,
    borderRadius: 5,
    marginHorizontal: 16,
    paddingLeft: 20
  },
  text: {
    marginLeft: 10,
    color: color.principal,
    fontFamily: 'AvenirNext-Medium',
    fontSize: 16
  }
})
