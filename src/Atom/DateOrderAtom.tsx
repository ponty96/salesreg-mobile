import * as React from 'react'
import { View, Text } from 'react-native'
import styles from './../Style/Layout'

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
