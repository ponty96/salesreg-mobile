import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import PropTypes from 'prop-types';

export default class DetailItemAtom extends Component{
    static defaultProps = {
        icon: 'add',
        text: 'Add a prop'
    }

    render(){
        return(
            <View style = {styles.wrapper}>
                <Text>
                    <Icon ios = {'ios-' +this.props.icon} android = {'md-' +this.props.icon} style = {styles.icon}/>
                </Text>
                <Text style = {styles.text}>
                    {this.props.text}
                </Text>
            </View>);
    }
}

DetailItemAtom.propTypes = {
    text: PropTypes.string,
    icon: PropTypes.string
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        marginVertical: 15
    },
    text: {
        marginLeft: 20,
        marginRight: 30,
        fontSize: 12
    }
});