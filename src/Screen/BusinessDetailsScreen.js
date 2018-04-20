import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'

import NameDisplayAtom from '../Atom/NameDisplayAtom';
import DetailsAtom from '../Atom/DetailsAtom';
import styles from './../Style/Screen'

class BusinessDetailsScreen extends Component {
    state = {
        item: {
            businessName: 'Business',
            address: '6 Salem street Morogbo, Lagos',
            email: 'kay5@gmail.com',
            description: 'Simply dummy text of the printing and typesetting industry. ' +
                            'Loren Ipsum has been the industry\'s standard dummy text ever since the 1550s, when an unknown printer took a ' +
                            'gallery of type and scrambled it'
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            item: this.state.item
        });
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: params.name,
            headerLeft: <Icon
                            name={'md-arrow-back'}
                            style={styles.headerIcon}
                            onPress={() => {
                                navigation.goBack();
                            }}
                        />,
            headerRight: <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('NewBusiness', {
                                    item: params.item
                                });
                            }}
                        >
                            <View style={styles.headerItem}>
                                <Icon
                                    name={'pencil'}
                                    style={styles.headerIconLogout}
                                    type={'MaterialCommunityIcons'}
                                />
                                <Text style={styles.headerText}>Edit</Text>
                            </View>
                        </TouchableOpacity>
        };
    };

    render() {
        return (
            <View style={styles.container}>
                <View style = {styles.nameDisplay}>
                    <NameDisplayAtom businessName={this.state.item.businessName}/>
                </View>
                <View>
                    <DetailsAtom item={this.state.item}/>
                </View>
            </View>
        )
    }
}

export default BusinessDetailsScreen