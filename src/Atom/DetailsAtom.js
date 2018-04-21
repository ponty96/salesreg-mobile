import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import DetailsBodyAtom from './DetailsBodyAtom';

class DetailsAtom extends Component{
    render(){
        return(
            <View style = {styles.container}>
                <Text style = {styles.detailsHeader}>
                    Details
                </Text>
                <DetailsBodyAtom item={this.props.item}/>
            </View>
        );
    }
}

DetailsAtom.propTypes = {
    item: PropTypes.object
}

export default DetailsAtom;

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