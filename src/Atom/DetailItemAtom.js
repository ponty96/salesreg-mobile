import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Icon} from 'native-base';
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
                        <Icon
                            name = { this.props.icon } 
                            type={'MaterialCommunityIcons'}
                        />
                        :
                        <Icon
                            name = { this.props.icon }
                            type = {'FontAwesome'}
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