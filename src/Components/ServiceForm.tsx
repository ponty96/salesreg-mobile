import { View, StyleSheet } from 'react-native'
import React from 'react'

import InputAtom from '../Atom/InputAtom'

export default class ServiceForm extends React.Component {
  render() {
    return (
      <View>
        <InputAtom
          label="Service name"
          inputStyle={styles.input}
          contStyle={styles.inputWrapper}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
    marginHorizontal: 16
  },
  inputWrapper: {
    marginTop: 50
  }
})
