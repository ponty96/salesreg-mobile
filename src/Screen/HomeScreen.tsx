import * as React from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import { color } from '../Style/Color'
import CustomHeader from '../Components/CustomHeader'
import Auth from '../services/auth'

interface IProps {
  navigation: any
}

interface IState {
  username: string
}

export default class HomeScreen extends React.Component<IProps, IState> {
  state = {
    username: ''
  }
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Home"
          showMenu
          onMenuPress={() => navigation.navigate('DrawerToggle')}
        />
      )
    }
  }

  componentWillMount() {
    this.updateUserName()
  }

  updateUserName = async () => {
    const user = JSON.parse(await Auth.getCurrentUser())
    this.setState({
      username: user.firstName
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.homeBackground}>
          <Text style={styles.homeText}>Welcome {this.state.username}!</Text>
        </View>
      </View>
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
