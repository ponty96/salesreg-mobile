import React, { Component } from 'React';
import { View, StyleSheet, Text } from 'react-native';

export default class DisplayWithLabelToTheRight extends Component {
  render() {
    let label = this.props.label;
    return(
      <View style = { styles.wrapper }>
        <View style = { styles.displayFirstLetterFromName }>
          <Text style = { styles.inscription }>
            { label.charAt(0).toUpperCase() }
          </Text>
        </View>
        <Text style = { styles.labelStyle}>
          { this.props.label }
        </Text>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayFirstLetterFromName: {
    backgroundColor: 'lightgray',
    height: 95,
    width: 95,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inscription: {
    fontSize: 25
  },
  labelStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 25
  }
});