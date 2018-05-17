import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

import NameDisplayAtom from '../Atom/NameDisplayAtom';
import DetailItemAtom from '../Atom/DetailItemAtom';
import styles from './../Style/Screen';

interface IProps {
    navigation: any;
}

interface IState {
    item: any;
}

class BusinessDetailsScreen extends Component<IProps, IState> {
    state = {
        item: {
            businessName: 'Business',
            image: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7',
            address: '6 Salem street Morogbo, Lagos',
            email: 'kay5@gmail.com',
            description: 'Simply dummy text of the printing and typesetting industry. ' +
                            'Loren Ipsum has been the industry\'s standard dummy text ever since the 1550s, when an unknown printer took a ' +
                            'gallery of type and scrambled it'
        }
    };

    static navigationOptions = ({ navigation }: any) => {
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
    }

    componentDidMount() {
        this.props.navigation.setParams({
            item: this.state.item
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style = {styles.nameDisplay}>
                    <NameDisplayAtom
                        businessName = { this.state.item.businessName }
                        image = { this.state.item.image }
                    />
                </View>
                <View style = {styles.detailsWrapper}>
                    <Text style = { styles.details }>
                        Details
                    </Text>
                </View>
                <View>
                    <View style = { styles.detailItemWrapper }>
                        <DetailItemAtom
                            icon = 'map-marker'
                            detailText = { this.state.item.address }
                            type = 'FontAwesome'
                        />
                    </View>
                    <View style = { styles.detailItemWrapper }>
                        <DetailItemAtom
                            icon = 'envelope'
                            detailText = { this.state.item.email }
                            type = 'FontAwesome'
                        />
                    </View>
                    <View style = { styles.detailItemWrapper }>
                        <DetailItemAtom
                            icon = 'file'
                            detailText = { this.state.item.description }
                            type = 'FontAwesome'
                        />
                    </View>
                </View>
            </View>
        );
    }
}

export default BusinessDetailsScreen;