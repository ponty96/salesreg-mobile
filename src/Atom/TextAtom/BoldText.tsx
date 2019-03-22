import React from 'react'
import { Text, StyleSheet } from 'react-native'

const BoldText = props => (
  <Text {...props} style={StyleSheet.flatten([styles.font, props.style])}>
    {props.children}
  </Text>
)

export default BoldText

const styles = StyleSheet.create({
  font: {
    fontFamily: 'AvenirNext-Bold'
  }
})
