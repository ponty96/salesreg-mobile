import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

import styles from './../Style/exportStyles';

export default class NameDisplayAtom extends Component {
    render() {
        return(
            <View style = {styles.nameDisplayWrapper}>
                <View style = { styles.nameDisplayLetterDisplay }>
                    {
                        this.props.image
                        ? <Image
                            source = {{uri: this.props.image}}
                            style = {styles.nameDisplayImage}
                        />
                        : <Text>
                            { this.props.businessName.charAt(0).toUpperCase() }
                        </Text>
                    }
                </View>
                <Text style = {styles.nameDisplayName}>
                    {this.props.businessName}
                </Text>
            </View>
        );
    }
}

NameDisplayAtom.propTypes = {
    businessName: PropTypes.string.isRequired
}