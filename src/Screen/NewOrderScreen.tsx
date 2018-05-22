import React, { Component } from 'react';
import { Icon } from 'native-base';

import styles from './../Style/Screen';
import NewOrderForm from '../Components/NewOrderForm';

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
    return (
      <NewOrderForm navigation={this.props.navigation} />
    )
  }
}

export default NewOrderScreen
