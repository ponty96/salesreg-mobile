import * as React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { color } from '../Style/Color';

interface IProps {
  style?: object
  containerStyle?: object
  headerText?: string;
  change?: boolean;
  inputForTwo?: boolean;
}

class FormContainerAtom extends React.Component<IProps, any> {
  render() {
    return (
      <View style={[styles.mainView, this.props.containerStyle]}>
        <Text style={styles.headerText}>{this.props.headerText}</Text>
        <View
          style={
            this.props.inputForTwo ? styles.inputViewForTwo : styles.inputView
          }
        >
          {this.props.children}
        </View>
      </View>
    );
  }
}

export default FormContainerAtom;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'transparent',
    width: '100%',
    paddingVertical: 8
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
    borderRadius: 3,
    paddingVertical: 8
  },
  inputViewForTwo: {
    width: Dimensions.get('screen').width - 32,
    alignSelf: 'center',
    backgroundColor: color.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 3
  },
  headerText: {
    alignSelf: 'center',
    fontSize: 14,
    color: color.label,
    fontFamily: 'SourceSansPro-Semibold'
  }
});
