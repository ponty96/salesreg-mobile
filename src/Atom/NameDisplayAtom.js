import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';

export default class NameDisplayAtom extends Component{
    static defaultProps = {
        businessName: 'Business name'
    }

    render(){
        const businessName = this.props.businessName;
        const firstLetterFromName = businessName.charAt(0);
        return(
            <View style = {styles.wrapper}>
                <View style = {styles.letterDisplay}>
                    <Text>
                        {firstLetterFromName}
                    </Text>
                </View>
                <Text style = {styles.name}>
                    {businessName}
                </Text>
            </View>
        );
    }
}

NameDisplayAtom.propTypes = {
    businessName: PropTypes.string
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center', 
    },
    letterDisplay: {
        height: 90,
        width: 90,
        borderRadius: 45,
        backgroundColor: '#f2f3f4',
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        fontSize: 14,
        fontWeight: '400',
        marginLeft: 20

    }
});