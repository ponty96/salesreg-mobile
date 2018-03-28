import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { List, ListItem, Icon, Fab } from 'native-base'

import styles from './../Style/Screen'
import { color } from './../Style/Color'

class BusinessListScreen extends Component {

    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;
        let right = (params && params.items && params.items.length > 0)
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
        let left = (params && params.items && params.items.length > 0)
                    ?   <Icon
                            name={'menu'}
                            onPress={() => navigation.navigate('DrawerToggle')}
                            style={styles.headerIcon}
                        />
                    :   null;
        return {
            title: 'Ayo',
            headerRight: right,
            headerLeft: left
        };
    };

    render() {
        // do change the list to the appropriate molecule
        return (
            <View style={ styles.centerContainer }>
                <Fab
                    position="bottomRight"
                    style={styles.fab}
                    onPress={() => this.props.navigation.navigate('NewBusiness')}
                >
                    <Icon
                        name="md-add"
                        color={color.secondary}
                    />
                </Fab>

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
            </View>
        )
    }
}

export default BusinessListScreen