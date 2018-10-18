import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { color } from '../../Style/Color'

interface IProp {
  label: string
  value: string
  rightTextStyle?: object
  listItemStyle?: object
  labelStyle?: object
  redText?: boolean
  greenText?: boolean
  quantity?: string
  icon?: JSX.Element
}

const ListItemAtom = (props: IProp): JSX.Element => {
  return (
    <View style={[styles.wrapper, props.listItemStyle]}>
      <Text style={[styles.text, props.labelStyle]}>{props.label}</Text>
      <View
        style={{
          justifyContent: 'flex-end',
          alignItems: 'flex-end'
        }}
      >
        {props.quantity ? (
          <Text style={{ color: color.textColor }}>{props.quantity}</Text>
        ) : (
          <Text />
        )}
        <Text
          style={[
            styles.text,
            props.rightTextStyle,
            props.redText ? { color: color.red } : undefined,
            props.greenText ? { color: color.selling } : undefined
          ]}
        >
          {props.value}
          {props.icon}
        </Text>
      </View>
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
    alignItems: 'center',
    marginBottom: 0.5,
    height: 64
  },
  text: {
    fontSize: 14,
    fontFamily: 'SourceSansPro-Semibold',
    color: color.secondary,
    justifyContent: 'center',
    textAlign: 'right',
    alignItems: 'center'
  }
})
