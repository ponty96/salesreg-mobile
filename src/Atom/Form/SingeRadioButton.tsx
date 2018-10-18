import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { View } from 'react-native-animatable'

const DEFAULT_SIZE_MULTIPLIER = 0.7
const DEFAULT_OUTER_BORDER_WIDTH_MULTIPLIER = 0.1

interface IProps {
  size: number
  innerColor: string
  outerColor: string
  isSelected: boolean
  onPress?: any
  animation: string
}
export default class SingleRadioButton extends React.Component<IProps> {
  static defaultProps = {
    size: 16,
    innerColor: 'dodgerblue',
    outerColor: 'dodgerblue',
    isSelected: false,
    onPress: () => null
  }

  render() {
    const { size, innerColor, outerColor, isSelected, onPress } = this.props
    const outerStyle = {
      borderColor: outerColor,
      width: size + size * DEFAULT_SIZE_MULTIPLIER,
      height: size + size * DEFAULT_SIZE_MULTIPLIER,
      borderRadius: (size + size * DEFAULT_SIZE_MULTIPLIER) / 2,
      borderWidth: size * DEFAULT_OUTER_BORDER_WIDTH_MULTIPLIER
    }

    const innerStyle = {
      width: size * DEFAULT_SIZE_MULTIPLIER,
      height: size * DEFAULT_SIZE_MULTIPLIER,
      borderRadius: size / 2,
      backgroundColor: innerColor
    }

    return (
      <TouchableOpacity style={[styles.radio, outerStyle]} onPress={onPress}>
        {isSelected ? <View style={innerStyle} {...this.props} /> : null}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  radio: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  }
})
