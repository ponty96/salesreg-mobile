import React, { Component } from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';

import styles from '../Style/Auth';

class AuthenticationHeader extends Component {
    static defaultProps = {
        smallHeader: true
    }

    render() {
        return (
            <View style = { this.props.smallHeader ? styles.smallHeader : [styles.smallHeader, styles.bigHeader] }>
                {
                    this.props.smallHeader 
                    ?
                    <Image source = { require('../Images/SalesReg-authication-screens.png') } />
                    :
                    <Image source = { require('../Images/SalesReg-logo-onboarding-and-homepage.png') } />
                }
            </View>
        )
    }
}

AuthenticationHeader.propTypes = {
    smallHeader: PropTypes.bool
}

export default AuthenticationHeader;