import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { List, ListItem, Icon, Fab } from 'native-base'

import styles from './../Style/Screen'
import { color } from './../Style/Color'

class BusinessDetailsScreen extends Component {

    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;
        return {
            title: params.name,
            headerRight: <Icon
                            name={'md-arrow-back'}
                            style={styles.headerIcon}
                            onPress={() => {
                                navigation.goBack();
                            }}
                        />,
            headerLeft: <View style={styles.headerItem}>
                            <Icon
                                name={'pencil'}
                                style={styles.headerIconLogout}
                                type={'MaterialCommunityIcons'}
                            />
                            <Text style={styles.headerText}>Edit</Text>
                        </View>
        };
    };

    render() {
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

export default BusinessDetailsScreen