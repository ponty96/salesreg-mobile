import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { color } from '../Style/Color'
// import { color } from '../Style/Color';

class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../build/Images/splashScreenLogo.png')}
          style={styles.splashScreenLogo}
        />
        {/* <ProgressBar
                    progress = {0.3}
                    width = {200}
                    style = { styles.progressBar }
                    color = { color.primary }
                /> */}
      </View>
    )
  }
}

export default SplashScreen

const styles = StyleSheet.create({
  splashScreenLogo: {
    position: 'absolute',
    top: '30%',
    left: '40%'
  },
  container: {
    flex: 1,
    backgroundColor: color.secondary
  }
})
