import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';

import DetailItemAtom from './DetailItemAtom';

class DetailsBodyAtom extends Component{
    render(){
        return(
            <View style = {styles.wrapper}>
                <DetailItemAtom icon = 'pin' text = {this.props.item.address} />
                <DetailItemAtom icon = 'mail' text = {this.props.item.email} />
                <DetailItemAtom icon = 'document' text = {this.props.item.description} />
            </View>
            );
    }
}

DetailsBodyAtom.propTypes = {
    item: PropTypes.object.isRequired
}

export default DetailsBodyAtom;

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 10
    }
});