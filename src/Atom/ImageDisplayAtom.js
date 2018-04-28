import React, { Component } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';


export default class ImageDisplayAtom extends Component {
    render() {
        return (
            <View style = { styles.container }>
                <View style = { styles.imageWrapper }>
                    <Image 
                        source = {{ uri: this.props.image }}
                        style = { styles.image }
                    />
                </View>
                <Text style = { styles.name }>
                    { this.props.name }
                </Text>
            </View>
        );
    }
}

ImageDisplayAtom.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string
}


const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        marginLeft: 30
    },
    imageWrapper: {
        height: 90,
        width: 90,
        borderRadius: 45,
        backgroundColor: '#f2f3f4'
    },
    image: {
        height: 90,
        width: 90,
        borderRadius: 45,
    },
    name: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 14,
        fontWeight: '400',
    }
});