import React from "react";
import { Text, View, KeyboardAvoidingView } from "react-native";

import styles from './../Style/Auth';
import ResetForm from './../Components/ResetForm';

class ResetScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.redView}>
                    <View style={styles.appName}>
                        <Text style={styles.appText}>{'SME APP'}</Text>
                    </View>
                </View>
                <View style={styles.whiteView} />
                <View style={styles.formContainer}>
                    <KeyboardAvoidingView style={styles.formInnerLayer} behaviour="position">
                        <ResetForm  navigation={this.props.navigation}/>
                    </KeyboardAvoidingView>
                </View>
            </View>
        );
    }
}

export default ResetScreen;