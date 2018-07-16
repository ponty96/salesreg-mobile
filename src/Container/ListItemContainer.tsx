import React from 'react'
import { View, StyleSheet } from 'react-native'

interface IProp {
  children?: any
}

const ListItemContainer = (props: IProp): JSX.Element => {
  return <View style={styles.wrapper}>{props.children}</View>
}

export default ListItemContainer

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingVertical: 16
  }
})
