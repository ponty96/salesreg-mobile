import React, { Component } from 'react'
import { Icon } from 'native-base'
import { StyleSheet } from 'react-native'
import NewOrderForm from '../Components/NewOrderForm'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

interface IState {}

class NewOrderScreen extends Component<IProps, IState> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      title: 'kay5ive Attractions',
      headerLeft: (
        <Icon
          name={'md-arrow-back'}
          style={styles.headerIcon}
          onPress={() => {
            navigation.goBack()
          }}
        />
      )
    }
  }

  render() {
    return <NewOrderForm navigation={this.props.navigation} />
  }
}

export default NewOrderScreen

const styles = StyleSheet.create({
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  }
})
