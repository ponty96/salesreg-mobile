import React, { Component } from 'react'
import EditVendorForm from '../Components/EditVendorForm'
import CustomHeader from '../Components/CustomHeader'

interface IProps {
  navigation: any
}

interface IState {}

class NewVendorScreen extends Component<IProps, IState> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader title="Vendor" onBackPress={() => navigation.goBack()} />
      )
    }
  }

  render() {
    return <EditVendorForm navigation={this.props.navigation} />
  }
}

export default NewVendorScreen
