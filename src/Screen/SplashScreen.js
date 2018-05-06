import React, { Component } from 'react';
import { View, Image } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

import styles from  '../Style/Screen';
import { color } from '../Style/Color';

class SplashScreen extends Component {
    render() {
        return (
            <View style = { styles.container }>
                <Image 
                    source = { require('../Images/splashScreenLogo.png') }
                    style = { styles.splashScreenLogo }
                />
                <ProgressBar 
                    progress = {0.3} 
                    width = {200}
                    style = { styles.progressBar }
                    color = { color.primary }
                />
            </View>
        )
    }
}

export default SplashScreen;