import React from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import { color } from '../Style/Color'

interface IProp {
  // label: string
  // topText: string
  // bottomText?: string
  listItemStyle?: object
  labelStyle?: object
  data: { left?: string; topRight?: string; bottomRight?: string }[]
}

const ListItemWithTwoValues = (props: IProp): JSX.Element => {
  return (
    <FlatList
      data={props.data}
      renderItem={({ item }) => {
        return (
          <View style={[styles.wrapper, props.listItemStyle]}>
            <Text style={[styles.text, props.labelStyle]}>{item.left}</Text>
            <View style={styles.rightView}>
              <Text style={[styles.text, styles.rightText]}>
                {item.topRight}
              </Text>
              <Text style={[styles.text, styles.rightText, styles.bottomText]}>
                {'\u20A6 '}
                {item.bottomRight}
              </Text>
            </View>
          </View>
        )
      }}
      keyExtractor={item => item.left}
    />
  )
}

export default ListItemWithTwoValues

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingHorizontal: 32,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0.5,
    borderBottomWidth: 1,
    borderBottomColor: color.listBorderColor
  },
  text: {
    fontSize: 14,
    fontFamily: 'Source Sans Pro',
    color: color.principal,
    marginVertical: 5
  },
  rightView: {
    justifyContent: 'space-between',
    marginVertical: 8
  },
  rightIconLabel: {
    color: color.button
  },
  rightText: {
    textAlign: 'right'
  },
  bottomText: {
    color: color.selling
  }
})
