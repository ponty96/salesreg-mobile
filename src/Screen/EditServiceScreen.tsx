import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import ServiceForm from '../Components/ServiceForm'
import { color } from '../Style/Color'
import CustomHeader from '../Components/CustomHeader'
import SaveCancelButton from '../Container/SaveCancelButton'

interface IProps {
  navigation: any
}

export default class EditServiceScreen extends Component<IProps, any> {
  state = {
    name: this.props.navigation.getParam('product', 'Product name'),
    price: this.props.navigation.getParam('price', 'Product price')
  }

  updateState = (key: string, value: any) => {
    this.setState({ [key]: value })
  }

  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader title="Service" onBackPress={() => navigation.goBack()} />
      )
    }
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <ServiceForm
          getName={val => this.updateState('name', val)}
          onSavePress={() => console.log('Save button pressed.')}
          defaultName={this.state.name}
          defaultPrice={this.state.price}
          getPrice={val => this.updateState('price', val)}
        />
        <SaveCancelButton navigation={navigation} positiveButtonName="SAVE" />
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
