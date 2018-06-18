import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Icon } from 'native-base'

import VendorForm from '../Components/VendorForm'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

interface IState {}

class VendorEditScreen extends Component<IProps, IState> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      title: 'Vendor',
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
    return <VendorForm navigation={this.props.navigation} />
  }
}

export default VendorEditScreen

const styles = StyleSheet.create({
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  }
})
