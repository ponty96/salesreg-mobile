import React, { Component } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { smallImageDisplay } from './../Style/exportStyles';

export default class ImageDisplayAtom extends Component {
    render() {
        return (
            <View style = { smallImageDisplay.container }>
                <View style = { smallImageDisplay.imageWrapper }>
                    <Image 
                        source = {{ uri: this.props.image }}
                        style = { smallImageDisplay.image }
                    />
                </View>
                <Text style = { smallImageDisplay.name }>
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