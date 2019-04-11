import React from 'react'
import { StyleSheet, View, Platform, StatusBar } from 'react-native'

interface IProps {
  backgroundColor?: string
  barStyle?: any
}
const StatusBarAtom = ({ backgroundColor, ...props }: IProps) =>
  Platform.OS == 'ios' ? (
    <View
      style={[styles.statusBar, { backgroundColor: backgroundColor || '#fff' }]}
    >
      <StatusBar hidden barStyle={props.barStyle || 'dark-content'} />
    </View>
  ) : (
    <StatusBar
      backgroundColor={backgroundColor || '#fff'}
      barStyle={props.barStyle || 'dark-content'}
      {...props}
    />
  )

export default StatusBarAtom

const styles = StyleSheet.create({
  statusBar: {
    height: 20,
    marginTop: -20,
    zIndex: 2000
  }
})
