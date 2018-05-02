import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

import { nameDisplayStyles } from './../Style/exportStyles';

export default class NameDisplayAtom extends Component {
    render() {
        return(
            <View style = {nameDisplayStyles.wrapper}>
                <View style = { nameDisplayStyles.letterDisplay }>
                    {
                        this.props.image
                        ? <Image
                            source = {{uri: this.props.image}}
                            style = {nameDisplayStyles.image}
                        />
                        : <Text>
                            { this.props.businessName.charAt(0).toUpperCase() }
                        </Text>
                    }
                </View>
                <Text style = {nameDisplayStyles.name}>
                    {this.props.businessName}
                </Text>
            </View>
        );
    }
}

NameDisplayAtom.propTypes = {
    businessName: PropTypes.string.isRequired
}