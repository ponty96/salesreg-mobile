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
      <StatusBar barStyle={props.barStyle || 'dark-content'} />
    </View>
  ) : (
    <StatusBar
      backgroundColor={backgroundColor || '#fff'}
      barStyle={props.barStyle || 'dark-content'}
      {...props}
    />
  )

export default StatusBarAtom

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
    marginTop: 0,
    zIndex: 2000
  }
})
