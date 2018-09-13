import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'native-base'

interface IProps {
  icon: string
  type: any
  detailText: string
}

export default class DetailItemAtom extends React.Component<IProps, any> {
  render() {
    return (
      <View style={styles.detailItemWrapper}>
        <Text>
          <Icon name={this.props.icon} type={this.props.type} />
        </Text>
        <Text style={styles.detailText}>{this.props.detailText}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  detailItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 35
  },
  detailText: {
    marginLeft: 20,
    marginRight: 30,
    fontSize: 12
  }
})
