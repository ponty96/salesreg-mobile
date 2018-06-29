import { View, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

import InputAtom from '../Atom/InputAtom'
import { color } from '../Style/Color'
import ButtonAtom from '../Atom/ButtonAtom'

interface IProp {
  label: string
  getValue: any
  onBackPress: any
  onSavePress: () => void
}

export default class ServiceForm extends React.Component<IProp> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <InputAtom
            label="Service name"
            getValue={this.props.getValue}
            contStyle={styles.inputWrapper}
          />
        </View>
        <View style={styles.inputView}>
          <InputAtom
            label="Rate/charges"
            getValue={this.props.getValue}
            contStyle={styles.inputWrapper}
          />
        </View>
        <View style={styles.buttonsWrapper}>
          <ButtonAtom
            btnText="CANCEL"
            btnStyle={styles.button}
            transparent={true}
            onPress={this.props.onBackPress}
          />
          <ButtonAtom
            btnText="SAVE"
            btnStyle={styles.button}
            transparent={true}
            textStyle={styles.buttonText}
            onPress={this.props.onSavePress}
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
  },
  buttonsWrapper: {
    backgroundColor: 'powderblue',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0
  },
  button: {
    flex: 0.5,
    borderWidth: 0.5,
    borderColor: color.dropdown,
    marginVertical: 0,
    height: 80,
    justifyContent: 'center'
  },
  buttonText: {
    color: color.principal
  }
})
