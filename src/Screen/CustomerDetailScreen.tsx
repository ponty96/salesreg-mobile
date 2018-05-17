import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

import ImageDisplayAtom from './../Atom/ImageDisplayAtom';
import DetailItemAtom from './../Atom/DetailItemAtom';
import GoldRatingsAtom from './../Atom/GoldRatingsAtom';
import ButtonAtom from './../Atom/ButtonAtom';
import styles from './../Style/Screen';
import styles1 from '../Style/exportStyles';

interface IProps {

}

interface IState {
    item: any
}

class CustomerDetailScreen extends PureComponent<IProps, IState> {
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
            marriageAniversary: '25 November',
            creditLimit: '7000.00',
            wallet: '0.00'
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topCompartment}>
                    <ImageDisplayAtom
                        image={this.state.item.image}
                        name={this.state.item.name}
                    />
                    <View style={styles.textWrapper}>
                        <View style={styles.purchaseWrapper}>
                            <Text style={styles.textTitle}>
                                Total purchase made
                        </Text>
                            <Text style={styles.textContent}>
                                N{this.state.item.purchaseMade}
                            </Text>
                        </View>
                        <View style={styles.purchaseWrapper}>
                            <Text style={styles.textTitle}>
                                debt
                        </Text>
                            <Text style={[styles.textContent, styles.redText]}>
                                #{this.state.item.credit}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.secondCompartment}>
                    <Text style={styles.details}>
                        Details
                </Text>
                    <View style={styles.detailItemWrapper}>
                        <DetailItemAtom
                            icon='phone'
                            detailText={this.state.item.phoneNumber}
                            type='FontAwesome'
                        />
                    </View>

                    <View style={styles.detailItemWrapper}>
                        <DetailItemAtom
                            icon='map-marker'
                            detailText={this.state.item.address}
                            type='FontAwesome'
                        />
                    </View>

                    <View style={styles.detailItemWrapper}>
                        <DetailItemAtom
                            icon='envelope'
                            detailText={this.state.item.email}
                            type='FontAwesome'
                        />
                    </View>

                    <View style={styles.detailItemWrapper}>
                        <DetailItemAtom
                            icon='birthday-cake'
                            detailText={this.state.item.birthday}
                            type='FontAwesome'
                        />
                    </View>

                    <View style={styles.detailItemWrapper}>
                        <DetailItemAtom
                            icon='ring'
                            detailText={this.state.item.marriageAniversary}
                            type='MaterialCommunityIcons'
                        />
                    </View>
                </View>
                <View style={styles.secondCompartment}>
                    <View style={styles.compartmentItemWrapper}>
                        <Text style={styles.compartmentItem}>
                            Rating
                    </Text>
                        <GoldRatingsAtom />
                    </View>
                </View>

                <View style={styles.secondCompartment}>
                    <View style={[styles.compartmentItemWrapper, styles.creditLimit]}>
                        <Text style={styles.compartmentItem}>
                            Credit Limit
                    </Text>
                        <Text style={[styles.textContent, styles.redText]}>
                            N{this.state.item.creditLimit}
                        </Text>
                    </View>
                </View>

                <View style={[styles.compartmentItemWrapper, styles.creditLimit]}>
                    <View style={styles.walletWrapper}>
                        <Text style={styles.compartmentItem}>
                            Wallet
                    </Text>
                        <Text style={[styles.compartmentItem, styles.walletText]}>
                            {this.state.item.wallet}
                        </Text>
                    </View>
                    <ButtonAtom
                        btnText='Add to wallet'
                        textStyle={styles1.redButtonText}
                    />
                </View>
            </View>
        );
    }
}

export default CustomerDetailScreen;
