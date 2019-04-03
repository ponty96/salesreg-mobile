import React from 'react'
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'

import { RegularText } from './TextAtom'
import { color } from '../Style/Color'

interface IProps {
  option: string
  onPress: () => void
  isSelected: boolean
  containerStyle?: any
}

const RadioAtom = (props: IProps) => (
  <TouchableWithoutFeedback onPress={props.onPress}>
    <View style={[styles.radio, props.containerStyle]}>
      <RegularText style={[styles.radioText]}>{props.option}</RegularText>
      <View style={[styles.circle, props.isSelected && styles.selected]} />
    </View>
  </TouchableWithoutFeedback>
)

export default RadioAtom

const styles = StyleSheet.create({
  radio: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 18
  },
  radioText: {
    color: color.principal,
    fontSize: 16
  },
  circle: {
    height: 24,
    width: 24,
    borderRadius: 14,
    backgroundColor: color.textBorderBottom,
    borderWidth: 2,
    borderColor: color.textBorderBottom
  },
  selected: {
    backgroundColor: color.green,
    borderColor: color.green
  }
})
