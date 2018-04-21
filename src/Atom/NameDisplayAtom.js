import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

<<<<<<< HEAD

export default class NameDisplayAtom extends Component {
    render() {
        return(
            <View style = {styles.wrapper}>
                <View style = { styles.letterDisplay }>
                    {
                        (this.props.image === null)
                        ?
                        <Text>
                            { this.props.businessName.charAt(0).toUpperCase() }
                        </Text>
                        :
                        <Image 
                            source = {{uri: this.props.image}}
                            style = {styles.image}
                        />
                    }
=======
export default class NameDisplayAtom extends Component{
    render(){
        return(
            <View style = {styles.wrapper}>
                <View style = {styles.letterDisplay}>
                    <Text>
                        {
                            //if charAt === letter, showLetter else showImage
                        }
                        {this.props.businessName.charAt(0)}
                    </Text>
>>>>>>> 7d83bc1ee10bc23d1579dd698aae92d8f3467392
                </View>
                <Text style = {styles.name}>
                    {this.props.businessName}
                </Text>
            </View>
        );
    }
}

NameDisplayAtom.propTypes = {
    businessName: PropTypes.string.isRequired
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
    image: {
        height: 90,
        width: 90,
        borderRadius: 45
    },
    name: {
        fontSize: 14,
        fontWeight: '400',
        marginLeft: 20

    }
});