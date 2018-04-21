import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
<<<<<<< HEAD
import {Icon} from 'native-base';

import DetailsBodyAtom from './DetailsBodyAtom';

export default class DetailsAtom extends Component{
=======
import PropTypes from 'prop-types';

import DetailsBodyAtom from './DetailsBodyAtom';

class DetailsAtom extends Component{
>>>>>>> 90fff446e37f4a8ca7ddf7e24bbce292a88a14ec
    render(){
        return(
            <View style = {styles.container}>
                <Text style = {styles.detailsHeader}>
                    Details
                </Text>
<<<<<<< HEAD
                <DetailsBodyAtom />
=======
                <DetailsBodyAtom item={this.props.item}/>
>>>>>>> 90fff446e37f4a8ca7ddf7e24bbce292a88a14ec
            </View>
        );
    }
}

<<<<<<< HEAD
=======
DetailsAtom.propTypes = {
    item: PropTypes.object
}

export default DetailsAtom;

>>>>>>> 90fff446e37f4a8ca7ddf7e24bbce292a88a14ec
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