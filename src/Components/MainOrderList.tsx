import React, { Component } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Icon, Button, Right, Header, Text } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'
import MainOrderListAtom from '../Atom/MainOrderListAtom'
import { mainOrderList } from '../config/data'

interface IProps {
  navigation: any
  onPress: () => void
  onClick: () => void
}

export default class MainOrderList extends Component<IProps, any> {
  state = {
    loading: true
  }

  async componentDidMount() {
    this.setState({ loading: false })
  }

  renderRow = (user: any) => {
    return <MainOrderListAtom items={user} onPress={this.props.onClick} />
  }

  render() {
    return (
      <View style={styles.listContainer}>
        <Header style={styles.headerMain}>
          <Right style={styles.direct}>
            <Button transparent onPress={this.props.onPress}>
              <Text uppercase={false} style={styles.btnTxt}>
                View Products
              </Text>
              <Icon style={styles.iconic} name="md-arrow-forward" />
            </Button>
          </Right>
        </Header>
        <ScrollView>
          <FlatList
            style={styles.listView}
            data={mainOrderList}
            renderItem={this.renderRow}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listContainer: {
    // backgroundColor: '#FFF',
    flex: 1,
    width: '100%'
  },
  listView: {
    paddingVertical: 10
  },
  direct: {
    flexDirection: 'row'
  },
  headerMain: {
    backgroundColor: '#fff',
    width: '100%'
  },
  btnTxt: {
    color: '#000',
    fontSize: 20
  },
  iconic: {
    color: '#000',
    marginBottom: 8
  }
})
