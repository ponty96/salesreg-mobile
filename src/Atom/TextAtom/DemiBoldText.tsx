import React from 'react'
import { Text, StyleSheet } from 'react-native'

const DemiBoldText = props => (
  <Text {...props} style={StyleSheet.flatten([styles.font, props.style])}>
    {props.children}
  </Text>
)

export default DemiBoldText

const styles = StyleSheet.create({
  font: {
    fontFamily: 'AvenirNext-DemiBold'
  }
})
