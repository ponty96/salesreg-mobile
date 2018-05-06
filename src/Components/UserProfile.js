import React, { Component } from 'react';
import { Icon } from 'native-base';
import { Image, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from '../Style/Screen';
import styles1 from '../Style/Form';

class UserProfile extends Component {
    render() {
        return (
            <View style = { styles.container }>
                <View style = { [styles.secondCompartment, styles.bottomPadding] }>
                    <View style = { styles1.selfAlign }>
                        {
                            this.props.image
                            ?
                            <Image
                                source = {{ uri: this.props.image }}
                                style = { styles1.imgContainer }
                            />
                            :
                            <Icon
                                name = "user-circle"
                                style = { styles1.icon }
                                type = 'FontAwesome'
                            />
                        }
                    </View>
                    <Text style = {[ styles1.selfAlign, styles.detailItemWrapper ]}>
                        { this.props.name }
                    </Text>
                </View>

                <View style = { styles.smallCompartment }>
                    <Text style = { styles.indentLeft }>
                        Gender
                    </Text>
                    <Text style = { styles.indentRight }>
                        { this.props.gender }
                    </Text>
                </View>
                
                <View style = { styles.smallCompartment }>
                    <Icon
                        name = 'phone'
                        style = { styles.indentLeft }
                        type={'FontAwesome'}
                    />
                    <Text style = { styles.indentRight }>
                        { this.props.phoneNumber }
                    </Text>
                </View>
            </View>
        );
    }
}

UserProfile.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired
}

export default UserProfile;