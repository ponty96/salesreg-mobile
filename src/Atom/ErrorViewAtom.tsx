import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon } from 'native-base'

import { MediumText } from '../Atom/TextAtom'
import { color } from '../Style/Color'

interface IProps {
  preferredErrorMessage?: string
}

const ErrorViewAtom = (props: IProps) => (
  <View style={styles.container}>
    <Icon name="alert-circle" type="Feather" style={styles.icon} />
    <MediumText style={styles.text}>
      {props.preferredErrorMessage ||
        `Error occurred while connecting, pull down to refresh`}
    </MediumText>
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
    marginTop: 20
  },
  icon: {
    fontSize: 90,
    color: color.errorIcon
  }
})
