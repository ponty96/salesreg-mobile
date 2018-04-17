import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'native-base';

import DetailItemAtom from './DetailItemAtom';

export default class DetailsBodyAtom extends Component{
    render(){
        const detail = [];
        detail[0] = '6 Salem street Morogbo, Lagos';
        detail[1] = 'kay5@gmail.com';
        detail[2] = 'Simply dummy text of the printing and typesetting industry. Loren Ipsum has been the industry\'s standard dummy text ever since the 1550s, when an unknown printer took a gallery of type and scrambled it';

        return(
            <View style = {styles.wrapper}>
                <DetailItemAtom icon = 'pin' text = {detail[0]} />
                <DetailItemAtom icon = 'mail' text = {detail[1]} />
                <DetailItemAtom icon = 'document' text = {detail[2]} />
            </View>
            );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 10
    }
});