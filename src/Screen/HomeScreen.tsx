import * as React from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import { color } from '../Style/Color'
import Header from '../Components/Header/BaseHeader'
import Auth from '../services/auth'
import { Content } from 'native-base'

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
        <Header
          title="Home"
          onPressLeftIcon={() => navigation.navigate('DrawerToggle')}
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
      <React.Fragment>
        <View style={styles.container}>
          <Content>
            <View style={styles.homeBackground}>
              <Text style={styles.homeText}>
                Welcome {this.state.username}!
              </Text>
            </View>
            <Text style={[styles.text, { marginVertical: 20 }]}>
              Tap he menu icon on the top right hand corner of the screen to
              find all the menu options you will be needing:
            </Text>
            <View style={styles.section}>
              <View style={styles.dot} />
              <Text style={[styles.text, { marginTop: -4 }]}>
                Scroll down to the find the settings menu where you can edit
                your profile
              </Text>
            </View>
            <View style={styles.section}>
              <View style={styles.dot} />
              <Text style={[styles.text, { marginTop: -4 }]}>
                Use the products and services menu to manage your inventory
              </Text>
            </View>
            <View style={styles.section}>
              <View style={styles.dot} />
              <Text style={[styles.text, { marginTop: -4 }]}>
                Manage your customers' activities in the customer menu.
              </Text>
            </View>
            <View style={styles.section}>
              <View style={styles.dot} />
              <Text style={[styles.text, { marginTop: -4 }]}>
                Process your sales using the sales and the invoice menu
              </Text>
            </View>
            <View style={styles.section}>
              <View style={styles.dot} />
              <Text style={[styles.text, { marginTop: -4 }]}>
                Expense and banking menus help with your finance
              </Text>
            </View>
          </Content>
        </View>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16
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
    fontFamily: 'AvenirNext-Bold'
  },
  text: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 17,
    textAlign: 'justify',
    marginRight: 30,
    color: color.textColor
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 15,
    backgroundColor: color.textColor
  },
  section: {
    flexDirection: 'row',
    marginBottom: 30,
    marginRight: 30,
    alignItems: 'flex-start'
  }
})
