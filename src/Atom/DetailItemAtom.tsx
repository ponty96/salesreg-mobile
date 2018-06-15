import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { color } from './../Style/Color'

interface IProps {
  title: any
  value: string
}

export default class DetailItemAtom extends React.Component<IProps, any> {
  render() {
    return (
      <View style={styles.detailItemWrapper}>
        <Text style={styles.detailTitle}>
          {this.props.title}
        </Text>
        <Text style={styles.detailText}>{this.props.value}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  detailItemWrapper: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: color.list
  },
  detailTitle: {
    color: color.label,
    fontSize: 16
  },
  detailText: {
    fontSize: 16
  }
})
