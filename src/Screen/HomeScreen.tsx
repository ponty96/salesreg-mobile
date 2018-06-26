import * as React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions
} from 'react-native'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

export default class HomeScreen extends React.Component<IProps> {
  static navigationOptions = () => {
    return {
      title: 'Home'
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.navigation.navigate('ViewBusiness')}
      >
        <View style={styles.homeBackground}>
          <Text style={styles.homeText}>Welcome Ayo!</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  homeBackground: {
    backgroundColor: 'rgba(152,251,152, 0.2)', // #98FB98
    width: Dimensions.get('screen').width - 32,
    alignSelf: 'center',
    marginTop: 16,
    borderRadius: 3
  },
  homeText: {
    color: color.selling,
    fontSize: 30,
    padding: 20,
    textAlign: 'center',
    fontFamily: 'SourceSansPro_Semibold'
  }
})
