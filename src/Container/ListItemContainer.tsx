import React from 'react'
import { View, StyleSheet } from 'react-native'
import { color } from '../Style/Color'

interface IProp {
  children?: any
  statusColor?: string
}

const ListItemContainer = (props: IProp): JSX.Element => {
  return (
    <View style={styles.wrapper}>
      <View
        style={[styles.statusIndicator, { backgroundColor: props.statusColor }]}
      />
      {props.children}
    </View>
  )
}

export default ListItemContainer

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: color.listBorderColor,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  statusIndicator: {
    width: 5,
    alignSelf: 'stretch',
    marginRight: 11,
    backgroundColor: 'transparent'
  }
})
