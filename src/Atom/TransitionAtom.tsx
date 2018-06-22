import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { color } from '../Style/Color'

interface IProps {
  firstScreen?: boolean
}

export default class TransitionAtom extends Component<IProps> {
  firstScreen = () => {
    return (
      <View style={styles.transitionIconWrapper}>
        <View style={styles.filledCircle} />
        <View style={styles.iconDash} />
        <View style={styles.unfilledCircle} />
      </View>
    )
  }

  secondScreen = () => {
    return (
      <View style={styles.transitionIconWrapper}>
        <View style={styles.filledCircle} />
        <View style={styles.iconDash} />
        <View style={styles.filledCircle} />
      </View>
    )
  }
  render() {
    return this.props.firstScreen ? this.firstScreen() : this.secondScreen()
  }
}

const styles = StyleSheet.create({
  transitionIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '5%'
  },
  filledCircle: {
    backgroundColor: color.button,
    borderRadius: 10,
    height: 20,
    width: 20
  },
  iconDash: {
    borderBottomColor: color.button,
    width: 25,
    borderBottomWidth: 1,
    alignSelf: 'center'
  },
  unfilledCircle: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: color.button,
    borderRadius: 10,
    height: 20,
    width: 20
  }
})
