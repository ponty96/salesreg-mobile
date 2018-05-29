import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { color } from '../Style/Color'

interface IProps {
  date: string
}

export default class DateOrderAtom extends React.Component<IProps, any> {
  render() {
    return (
      <View style={styles.dateOrderContainer}>
        <Text style={styles.dateText}>{this.props.date}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  dateOrderContainer: {
    flexDirection: 'row',
    flex: 1,
    height: 60,
    backgroundColor: color.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: color.listBorderColor
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: color.inactive
  }
})
