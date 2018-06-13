import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon } from 'native-base'

import InputAtom from '../Atom/InputAtom'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

interface IState {}

class ServiceEditScreen extends PureComponent<IProps, IState> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      title: 'Services',
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

  getServiceName = (name: string) => {
    console.log(name)
  }

  getCharges = (charges: string) => {
    console.log(charges)
  }

  render() {
    return (
      <View style={styles.container}>
        <InputAtom
          label="Service name"
          getValue={this.getServiceName}
          contStyle={styles.marginlessInput}
        />
        <InputAtom
          label="Rate/Charges"
          getValue={this.getCharges}
          contStyle={styles.marginlessInput}
        />
      </View>
    );
  }
}

export default ServiceEditScreen

const styles = StyleSheet.create({
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  },
  container: {
    flex: 1,
    marginHorizontal: 16
  },
  marginlessInput: {
    marginLeft: 0
  }
})
