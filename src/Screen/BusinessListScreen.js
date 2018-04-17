import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { List, ListItem, Icon } from 'native-base';

import FabAtom from './../Atom/FabAtom';
import styles from './../Style/Screen';

class BusinessListScreen extends Component {
    static defaultProps = {
        items: [],
        auth: 'Sme'
    }

    static navigationOptions = ({ navigation }, itemLength = this.props.items.length) => {
        let right = (itemLength > 0)
                    ?   <Icon
                            name={'ios-search'}
                            style={styles.headerIcon}
                        />
                    :   <View style={styles.headerItem}>
                            <Icon
                                name={'logout'}
                                style={styles.headerIconLogout}
                                type={'MaterialCommunityIcons'}
                            />
                            <Text style={styles.headerText}>Logout</Text>
                        </View>;
        let left = (itemLength > 0) && <Icon
                            name={'menu'}
                            onPress={() => navigation.navigate('DrawerToggle')}
                            style={styles.headerIcon}
                        />;
        return {
            title: 'Ayo',
            headerRight: right,
            headerLeft: left
        };
    };

    renderEmpty = () => {
        return (
            <View style={ styles.emptyHolder }>
                <Text style={styles.emptyHeader}>
                    `Welcome ${this.props.authName}!`
                </Text>
                <Text>
                    You have no business yet. Press the
                </Text>
                <Text style={styles.redText}>
                    red round button
                </Text>
                <Text>
                    below to add your bussinesses.
                </Text>
            </View>
        );
    }

    renderList = () => {
        return (
            <List>
                <ListItem
                    onPress={() => this.props.navigation.navigate('ViewBusiness',
                        {
                            name: 'Kay5iveAttractions',
                            id: 'ID here for getting data at the new scrren'
                        }
                    )
                    }
                >
                    <Text>Views</Text>
                </ListItem>
            </List>
        );
    }

    render() {
        // do change the list to the appropriate molecule
        return (
            <View style={ styles.plainContainer }>
                <FabAtom
                    routeName={'NewBusiness'}
                    name={'md-add'}
                    navigation={this.props.navigation}
                />

                {
                    this.props.items.length > 0
                    ? this.renderEmpty()
                    : this.renderList()
                }
            </View>
        )
    }
}

BusinessListScreen.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    authName: PropTypes.string
}

export default BusinessListScreen