import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from './Icon'
import { color } from '../Style/Color'

interface IProps {
  onRefresh: () => void
  preferredErrorMessage?: string
}

const ErrorViewAtom = (props: IProps) => (
  <View style={styles.container}>
    <Icon name="alert-circle" type="Feather" style={styles.icon} />
    <Text style={styles.text}>
      {props.preferredErrorMessage ||
        `Error occurred while connecting, pull down to refresh`}
    </Text>
  </View>
)

export default ErrorViewAtom

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    backgroundColor: '#fff'
  },
  text: {
    color: color.textColor,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'AvenirNext-Medium'
  },
  icon: {
    fontSize: 90,
    color: color.errorIcon
  }
})
