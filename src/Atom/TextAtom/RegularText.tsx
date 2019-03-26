import React from 'react'
import { Text, StyleSheet } from 'react-native'

const RegularText = props => (
  <Text {...props} style={StyleSheet.flatten([styles.font, props.style])}>
    {props.children}
  </Text>
)

export default RegularText

const styles = StyleSheet.create({
  font: {
    fontFamily: 'AvenirNext-Regular'
  }
})
