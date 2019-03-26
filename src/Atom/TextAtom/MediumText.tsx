import React from 'react'
import { Text, StyleSheet } from 'react-native'

const MediumText = props => (
  <Text {...props} style={StyleSheet.flatten([styles.font, props.style])}>
    {props.children}
  </Text>
)

export default MediumText

const styles = StyleSheet.create({
  font: {
    fontFamily: 'AvenirNext-Medium'
  }
})
