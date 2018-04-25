import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import ImageDisplayAtom from './../Atom/ImageDisplayAtom';
import DetailItemAtom from './../Atom/DetailItemAtom';
import styles from './../Style/Screen';

export default class CustomerDetailScreen extends React.Component {
    state = {
        item: {
            image: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7',
            name: 'Salomy',
            purchaseMade: '46,000.00',
            credit: '10,000.00',
            phoneNumber: '09034567889, 08067654323',
            address: '6 Salem street Morogbo, Lagos',
            email: 'salosalo@gmail.com',
            birthday: '03 March',
            weddingDay: '25 November',
            icon: {
                addressIcon: 'map-marker',
                emailIcon: 'envelope',
                callIcon: 'phone',
                birthdayIcon: 'birthday-cake',
                ringIcon: 'ring'
            }
        }
    }
  
    render() {
      return (
        <View style = {styles.container}>
            <View style = { styles.topCompartment }>
                <ImageDisplayAtom
                    image = { this.state.item.image }
                    name = { this.state.item.name }
                />
                <View style = { styles.textWrapper }>
                    <View style = { styles.purchaseWrapper }>
                        <Text style = { styles.textTitle }>
                            Total purchase made
                        </Text>
                        <Text style = { styles.textContent }>
                            N{ this.state.item.purchaseMade }
                        </Text>
                    </View>
                    <View style = { styles.purchaseWrapper }>
                        <Text style = { styles.textTitle }>
                            debt
                        </Text>
                        <Text style = { [styles.textContent, styles.redText] }>
                            #{ this.state.item.credit }
                        </Text>
                    </View>
                </View>
            </View>
            <View style = { styles.secondCompartment }>
                <Text style = { styles.details }>
                    Details
                </Text>
                <View style = { styles.detailItemWrapper }>
                    <DetailItemAtom 
                        icon = { this.state.item.icon.callIcon }
                        text = { this.state.item.phoneNumber}
                    />
                </View>
                <View style = { styles.detailItemWrapper }>
                    <DetailItemAtom 
                        icon = { this.state.item.icon.addressIcon }
                        text = { this.state.item.address }
                    />
                </View>
                <View style = { styles.detailItemWrapper }>
                    <DetailItemAtom 
                        icon = { this.state.item.icon.emailIcon }
                        text = { this.state.item.email }
                    />
                </View>
                <View style = { styles.detailItemWrapper }>
                    <DetailItemAtom 
                        icon = { this.state.item.icon.birthdayIcon }
                        text = { this.state.item.birthday }
                    />
                </View>
                <View style = { styles.detailItemWrapper }>
                    <DetailItemAtom 
                        icon = { this.state.item.icon.ringIcon }
                        text = { this.state.item.weddingDay }
                    />
                </View>
            </View>
        </View>
      );
    }
}