import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'

import { color } from '../Style/Color'

interface ChipProps {
  text: string
  onPress?: (text: string) => void
  showCloseIcon?: boolean | false
  onPressCloseIcon?: () => void
}

export const Chip = (props: ChipProps) => (
  <TouchableOpacity
    onPress={() =>
      props.onPress ? props.onPress(props.text) : console.log(props.text)
    }
  >
    <View style={styles.chip}>
      <Text style={styles.text}>{props.text}</Text>
      {props.showCloseIcon && (
        <Icon
          name="md-close-circle"
          type="Ionicons"
          style={styles.icon}
          onPress={props.onPressCloseIcon}
        />
      )}
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  chip: {
    backgroundColor: color.grey,
    borderWidth: 1,
    borderColor: color.grey,
    borderRadius: 24,
    padding: 12,
    paddingVertical: 8,
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    color: color.textColor,
    paddingRight: 8
  },
  icon: {
    color: color.subHeader,
    fontSize: 28
  }
})
