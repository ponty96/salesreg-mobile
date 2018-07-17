import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { color } from '../Style/Color'

interface IProp {
  label: string
  value: string
  rightTextStyle?: object
  listItemStyle?: object
}

const ListItemAtom = (props: IProp): JSX.Element => {
  return (
    <View style={[styles.wrapper, props.listItemStyle]}>
      <Text style={styles.text}>{props.label}</Text>
      <Text style={[styles.text, props.rightTextStyle]}>{props.value}</Text>
    </View>
  )
}

export default ListItemAtom

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingLeft: 32,
    paddingRight: 16,
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 0.5,
    height: 64
  },
  text: {
    fontSize: 14,
    fontFamily: 'SourceSansPro_Semibold',
    color: color.secondary
  }
})
