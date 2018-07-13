import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { color } from '../Style/Color'

interface IProps {
  priceOrNumberSold?: String
  label: string
  priceColor?: object
}

export default class ServiceListAtom extends Component<IProps> {
  render() {
    return (
      <View style={styles.listContainer}>
        <Text style={styles.listText}>{this.props.label}</Text>
        <Text style={[styles.listText, this.props.priceColor]}>
          {this.props.priceOrNumberSold}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: color.dropdown,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listText: {
    fontFamily: 'SourceSansPro',
    marginHorizontal: 32
  }
})
