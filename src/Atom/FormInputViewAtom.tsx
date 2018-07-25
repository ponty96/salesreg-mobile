import * as React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { color } from '../Style/Color'

interface IProps {}

class FormInputViewAtom extends React.Component<IProps, any> {
  render() {
    return <View style={styles.inputView}>{this.props.children}</View>
  }
}

export default FormInputViewAtom

const styles = StyleSheet.create({
  inputView: {
    width: Dimensions.get('screen').width - 32,
    alignSelf: 'center',
    backgroundColor: color.secondary,
    alignContent: 'center',
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 16,
    borderRadius: 3
  }
})
