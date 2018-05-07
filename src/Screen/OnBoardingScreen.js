import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';

import ButtonAtom from '../Atom/ButtonAtom';
import styles from '../Style/Auth';
import { signupButton, redButtonText } from '../Style/exportStyles';
import AuthenticationHeader from '../Components/AuthenticationHeader';

class OnBoardingScreen extends Component {
    render() {
        const appDetails = [
            'All your businesses in one place',
            'Manage all your produts',
            'Make your customers happy',
            'Control your credits/debts',
            'Increase your profit'
        ]

        return (
            <View style = { styles.container }>
                <AuthenticationHeader smallHeader = { false } />
                <View style = { styles.boardingScreenFeatureText }>
                    {
                        appDetails.map((details, i) => 
                            <View 
                                style = { styles.appFunctionWrapper } 
                                key = { i }
                            >
                                <Icon
                                    name = 'check'
                                    style = { styles.blueCheck }
                                    type = 'Entypo'
                                />
                                <Text style = { styles.appDetailsText }>
                                    { details }
                                </Text>
                            </View>
                        )
                    }
                </View>
                <View style = { styles.buttomButtonsWrapper }>
                    <ButtonAtom
                        btnText = 'SIGN UP'
                        textStyle = { redButtonText }
                        btnStyle = { signupButton }
                    />
                    <ButtonAtom
                        btnText = 'LOGIN'
                        textStyle = { redButtonText }
                        btnStyle = { signupButton }
                    />
                </View>
            </View>
        )
    }
}

export default OnBoardingScreen;