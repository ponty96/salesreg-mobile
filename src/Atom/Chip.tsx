import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { color } from '../Style/Color'

interface ChipProps {
  text: string
  onPress?: (text: string) => void
}
export const Chip = (props: ChipProps) => (
  <TouchableOpacity onPress={() => props.onPress(props.text)}>
    <View style={styles.chip}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  chip: {
    backgroundColor: color.textBorderBottom,
    borderWidth: 1,
    borderColor: color.textBorderBottom,
    borderRadius: 24,
    padding: 12,
    margin: 8
  },
  text: {
    color: color.textColor
  }
})
