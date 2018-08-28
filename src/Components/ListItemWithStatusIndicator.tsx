import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { color } from '../Style/Color'
import { Icon } from 'native-base'

interface IProp {
  label: string
  value: string
  rightTextStyle?: object
  listItemStyle?: object
  labelStyle?: object
  statusColor?: string
}

const ListItemWithStatusIndicator = (props: IProp): JSX.Element => {
  return (
    <View style={[styles.wrapper, props.listItemStyle]}>
      <View
        style={[styles.statusIndicator, { backgroundColor: props.statusColor }]}
      />
      <Text style={[styles.text, props.labelStyle]}>{props.label}</Text>
      <View style={styles.rightView}>
        <Text style={[styles.text, props.rightTextStyle]}>{props.value}</Text>
        <Icon
          name="chevron-small-right"
          type="Entypo"
          style={styles.rightIconLabel}
        />
      </View>
    </View>
  )
}

export default ListItemWithStatusIndicator

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingLeft: 32,
    paddingRight: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0.5,
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: color.listBorderColor
  },
  text: {
    fontSize: 14,
    fontFamily: 'Source Sans Pro',
    color: color.secondary
  },
  statusIndicator: {
    width: 5,
    alignSelf: 'stretch',
    marginRight: 27,
    backgroundColor: 'transparent'
  },
  rightView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightIconLabel: {
    color: color.button
  }
})
