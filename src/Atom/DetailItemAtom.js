import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

export default class DetailItemAtom extends Component{
    render(){
        return(
            <View style = {styles.wrapper}>
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
                <Text style = {styles.text}>
                    {this.props.text}
                </Text>
            </View>);
    }
}

DetailItemAtom.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 35
    },
    text: {
        marginLeft: 20,
        marginRight: 30,
        fontSize: 12
    }
});