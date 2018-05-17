import React, { Component } from 'react'
import { View, ListView } from 'react-native'
import { Font, AppLoading } from 'expo'
import { Root, Icon, Button, Right, Header, Text } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'

import MainOrderListAtom from '../Atom/MainOrderListAtom'
import styles from '../Style/OrderList'
import { mainOrderList } from '../config/data'

const users = mainOrderList

export default class MainOrderList extends Component {
  constructor() {
    super()
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.state = {
      userDataSource: ds.cloneWithRows(users),
      loading: true
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    })
    this.setState({ loading: false })
  }

  renderRow(user) {
    return <MainOrderListAtom items={user} />
  }
  render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      )
    }
    return (
      <View style={styles.listContainer}>
        <Header style={styles.headerMain}>
          <Right style={styles.direct}>
            <Button transparent>
              <Text uppercase={false} style={styles.btnTxt}>
                View Products
              </Text>
              <Icon style={styles.iconic} name="md-arrow-forward" />
            </Button>
          </Right>
        </Header>
        <ScrollView>
          <ListView
            style={styles.listView}
            dataSource={this.state.userDataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </ScrollView>
      </View>
    )
  }
}
