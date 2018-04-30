import React, {Component} from 'react';
import { View, Text } from 'react-native';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import styles from './../Style/Layout';

export default class DetailItemAtom extends Component{
    render(){
        return(
            <View style = {styles.detailItemWrapper}>
                <Text>
                    {
                        this.props.icon === 'ring'
                        ?
                        <Icon2
                            name = { this.props.icon } 
                            size = { 14 }
                        />
                        :
                        <Icon1
                            name = { this.props.icon }
                            size = { 14 } 
                        />
                    }
                </Text>
                <Text style = {styles.detailText}>
                    {this.props.detailText}
                </Text>
            </View>);
    }
}

DetailItemAtom.propTypes = {
    detailText: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}