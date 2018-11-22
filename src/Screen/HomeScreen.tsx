import * as React from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import { color } from '../Style/Color'
import Header from '../Components/Header/BaseHeader'
import Auth from '../services/auth'
import AddSalesOrderItemsList from '../Atom/Form/AddSalesOrderItemsList'

interface IProps {
  navigation: any
}

interface IState {
  username: string
  salesItems: any[]
}

export default class HomeScreen extends React.Component<IProps, IState> {
  state = {
    username: '',
    salesItems: []
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
      <View style={styles.container}>
        <View style={styles.homeBackground}>
          <Text style={styles.homeText}>Welcome {this.state.username}!</Text>
        </View>
        <AddSalesOrderItemsList
          salesItems={this.state.salesItems}
          productList={[{ mainLabel: 'Orange', value: 'orange' }]}
          onUpdateItems={item => this.setState({ salesItems: item })}
        />
      </View>
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
    fontFamily: 'SourceSansPro-Semibold'
  }
})
