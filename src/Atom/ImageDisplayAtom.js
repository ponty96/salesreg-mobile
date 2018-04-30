import React, { Component } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import smallImageDisplay from './../Style/exportStyles';

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