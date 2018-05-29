import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import NewCustomerForm from '../Components/NewCustomerForm'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

interface IState {}

class NewCustomerScreen extends Component<IProps, IState> {
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
    return <NewCustomerForm navigation={this.props.navigation} />
  }
}

export default NewCustomerScreen

const styles = StyleSheet.create({
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  }
})
