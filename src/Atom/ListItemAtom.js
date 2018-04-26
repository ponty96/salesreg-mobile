import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View, Text, Image} from 'react-native';

import styles from '../Style/Layout';

class ListItemAtom extends Component {
    static defaultProps = {
        business: true
    }

    renderAvatar = () => {
        return this.props.item.image
            ? <Image
                source={{uri: this.props.item.image}}
                style={[
                    styles.imageIconCont,
                    this.props.imgStyle
                ]}
            />
            : <View
                style={styles.textIconCont}
            >
                <Text
                    style={styles.innerText}
                >
                    {this.props.item.name.charAt(0).toUpperCase()}
                </Text>
            </View>;
    }

    render() {
        return (
            <View
                style={styles.sidebarListCont}
            >
                {this.renderAvatar()}
                <View
                    style={styles.listTextCont}
                >
                    <Text
                        style={styles.boldText}
                    >
                        {this.props.item.name.toUpperCase()}
                    </Text>
                    <Text
                        style={styles.itemIcon}
                    >
                        { this.props.business ? 'view business profile' : 'view your profile' }
                    </Text>
                </View>
            </View>
        );
    }
}

ListItemAtom.propTypes = {
    item: PropTypes.object.isRequired,
    imgStyle: PropTypes.object,
    imgTextStyle: PropTypes.object,
    business: PropTypes.bool
}

export default ListItemAtom;