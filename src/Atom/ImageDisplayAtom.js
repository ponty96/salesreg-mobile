import React, { Component } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import styles from '../Style/exportStyles';

export default class ImageDisplayAtom extends Component {
    render() {
        return (
            <View style = { styles.smallImageDisplayContainer }>
                <View style = { styles.smallImageDisplayImageWrapper }>
                    <Image 
                        source = {{ uri: this.props.image }}
                        style = { styles.smallImageDisplayImage }
                    />
                </View>
                <Text style = { styles.smallImageDisplayName }>
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