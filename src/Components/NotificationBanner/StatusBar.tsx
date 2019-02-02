import React from 'react'
import { StyleSheet, View, Platform, StatusBar } from 'react-native'

const AppStatusBar = ({ backgroundColor, ...props }) =>
  Platform.OS == 'ios' && (
    <View
      style={[
        styles.statusBar,
        { backgroundColor: backgroundColor || '#00b0cf' }
      ]}
    >
      <StatusBar hidden barStyle={props.barStyle || 'light-content'} />
    </View>
  )

export default AppStatusBar

const styles = StyleSheet.create({
  statusBar: {
    height: 20,
    marginTop: -20,
    zIndex: 2000
  }
})
