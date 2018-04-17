import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'native-base';

import DetailsBodyAtom from './DetailsBodyAtom';

export default class DetailsAtom extends Component{
    render(){
        return(
            <View style = {styles.container}>
                <Text style = {styles.detailsHeader}>
                    Details
                </Text>
                <DetailsBodyAtom />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      marginHorizontal: 30,
      marginTop: 30
  },
  detailsHeader: {
      fontSize: 14,
      fontWeight: '300'
  },
  icon: {
      fontSize: 30
  },
  text: {
      marginLeft: 20
  }
})