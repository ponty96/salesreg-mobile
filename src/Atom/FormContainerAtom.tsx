import * as React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { color } from '../Style/Color'

interface IProps {
  headerText?: string
  style?: object
  containerStyle?: object
}

class FormContainerAtom extends React.Component<IProps, any> {
  render() {
    return (
      <View style={[styles.mainView, this.props.containerStyle]}>
        <Text style={styles.headerText}>{this.props.headerText}</Text>
        <View style={[styles.inputView, this.props.style]}>
          {this.props.children}
        </View>
      </View>
    )
  }
}

export default FormContainerAtom

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'transparent',
    width: '100%'
  },
  inputView: {
    width: Dimensions.get('screen').width - 32,
    alignSelf: 'center',
    backgroundColor: color.secondary,
    alignContent: 'center',
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 3
  },
  headerText: {
    alignSelf: 'center',
    fontSize: 14,
    color: color.button,
    fontFamily: 'SourceSansPro_Semibold'
  }
})
