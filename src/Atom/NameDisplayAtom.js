import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';

export default class NameDisplayAtom extends Component{
<<<<<<< HEAD
    static defaultProps = {
        businessName: 'Business name'
    }

    render(){
        const businessName = this.props.businessName;
        const firstLetterFromName = businessName.charAt(0);
=======
    render(){
>>>>>>> 90fff446e37f4a8ca7ddf7e24bbce292a88a14ec
        return(
            <View style = {styles.wrapper}>
                <View style = {styles.letterDisplay}>
                    <Text>
<<<<<<< HEAD
                        {firstLetterFromName}
                    </Text>
                </View>
                <Text style = {styles.name}>
                    {businessName}
=======
                        {
                            //if charAt === letter, showLetter else showImage
                        }
                        {this.props.businessName.charAt(0)}
                    </Text>
                </View>
                <Text style = {styles.name}>
                    {this.props.businessName}
>>>>>>> 90fff446e37f4a8ca7ddf7e24bbce292a88a14ec
                </Text>
            </View>
        );
    }
}

NameDisplayAtom.propTypes = {
<<<<<<< HEAD
    businessName: PropTypes.string
=======
    businessName: PropTypes.string.isRequired
>>>>>>> 90fff446e37f4a8ca7ddf7e24bbce292a88a14ec
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