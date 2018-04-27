import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'native-base'

import styles from './../Style/Screen'
import NewBusinessForm from "../Components/NewBusinessForm";

class NewBusinessScreen extends Component {
    state = {
        item: undefined
    }

    static navigationOptions = ({ navigation }) => {
        const { params={itemsLength: 1} } = navigation.state;
        let itemsLength = params.itemsLength ? params.itemsLength : (params.item ? 1 : 0);
        let right = (itemsLength < 1)
                    && <View style={styles.headerItem}>
                            <Icon
                                name={'logout'}
                                style={styles.headerIconLogout}
                                type={'MaterialCommunityIcons'}
                            />
                            <Text style={styles.headerText}>Logout</Text>
                        </View>;
        let left = (itemsLength > 0)
                    ?  <Icon
                            name={'menu'}
                            onPress={() => navigation.navigate('DrawerToggle')}
                            style={styles.headerIcon}
                        />
                    : null;
        return {
            title: 'Ayo',
            headerRight: right,
            headerLeft: left
        };
    };

    componentWillMount() {
        this.setState({
            item: this.props.navigation.getParam('item', undefined)
        });
    }
    
    render() {
        return (
            this.state.item
                ? <NewBusinessForm
                    item={this.state.item}
                    navigation={this.props.navigation}
                />
                : <NewBusinessForm
                    navigation={this.props.navigation}
                />

        );
    }
}

export default NewBusinessScreen