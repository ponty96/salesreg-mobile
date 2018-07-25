import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import ButtonAtom from '../Atom/ButtonAtom'
import { color } from './../Style/Color'

interface IProps {
  navigation: any
  createfunc?: () => void
  positiveButtonName: string
}

class SaveCancelButton extends React.Component<IProps, any> {
  create = () => {
    if (this.props.createfunc) {
      this.props.createfunc()
    }
  }

  render() {
    return (
      <View style={styles.saveCancelContainer}>
        <ButtonAtom
          btnText="CANCEL"
          transparent={true}
          onPress={() => this.props.navigation.goBack()}
          btnStyle={styles.button}
          textStyle={styles.buttonText}
        />

        <ButtonAtom
          btnText={this.props.positiveButtonName}
          transparent={true}
          onPress={this.create}
          btnStyle={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    )
  }
}

export default SaveCancelButton

const styles = StyleSheet.create({
  saveCancelContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    height: 65
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
    color: color.principal,
    fontFamily: 'SourceSansPro_Semibold'
  }
})
