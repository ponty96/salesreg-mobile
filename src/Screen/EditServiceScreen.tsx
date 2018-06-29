import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import ServiceForm from '../Components/ServiceForm'
import { color } from '../Style/Color'
import { Icon } from 'native-base'

interface IProps {
  navigation: any
}

export default class EditServiceScreen extends Component<IProps> {
  state = {
    name: ''
  }

  getName = (name: string) => {
    this.setState({ name: name })
  }

  static navigationOptions = ({ navigation }: any) => {
    return {
      title: 'Service',
      headerRight: <View />,
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
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <ServiceForm
          label="Service name"
          getValue={this.getName}
          onBackPress={() => navigation.goBack()}
          onSavePress={() => console.log('Save button pressed.')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.modal
  },
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  }
})
