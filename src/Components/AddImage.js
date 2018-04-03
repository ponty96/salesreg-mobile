import React, { Component } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

export default class AddImage extends Component {
  render(){
    const pic = {uri: this.props.pic};
    return(
      <View style = {styles.view}>
        <Image source = {pic} 
        style = {styles.image}
        />
        <Text style = {styles.text}>
          {this.props.label }
        </Text>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 170,
    height: 170,
    borderRadius: 90,
    marginTop: 30
  },
  text: {
    marginTop: 10,
    fontSize: 18
  }
});