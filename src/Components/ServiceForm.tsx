import { View, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

import InputAtom from '../Atom/InputAtom'
import { color } from '../Style/Color'

interface IProp {
  getName: (name: string) => void
  onSavePress: () => void
  defaultName: string
  defaultPrice: string
  getPrice: (name: string) => void
}

export default class ServiceForm extends React.Component<IProp> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <InputAtom
            label="Service name"
            getValue={this.props.getName}
            contStyle={styles.inputWrapper}
            defaultValue={this.props.defaultName}
          />
        </View>
        <View style={styles.inputView}>
          <InputAtom
            label="Rate/charges"
            getValue={this.props.getPrice}
            contStyle={styles.inputWrapper}
            defaultValue={this.props.defaultPrice}
            keyboardType="numeric"
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputView: {
    width: Dimensions.get('screen').width - 32,
    alignSelf: 'center',
    backgroundColor: color.secondary,
    alignContent: 'center',
    padding: 3,
    borderRadius: 3,
    marginTop: 16
  },
  inputWrapper: {
    marginTop: 16,
    paddingBottom: 8,
    marginLeft: 8,
    marginRight: 8
  }
})
