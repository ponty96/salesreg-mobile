import React, { Component } from 'react'
// import { View } from 'react-native'
import { Icon } from 'native-base'
import NewCustomerForm  from '../Components/NewCustomerForm'

import styles from './../Style/Screen'

interface IProps {
    navigation: any;
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
    return (
      <NewCustomerForm navigation={this.props.navigation} />
    )
  }
}

export default NewCustomerScreen
