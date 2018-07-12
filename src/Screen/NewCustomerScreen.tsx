import React, { Component } from 'react'
import EditCustomerForm from '../Components/EditCustomerForm'
import CustomHeader from '../Components/CustomHeader'

interface IProps {
  navigation: any
}

class NewCustomerScreen extends Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Customer"
          onBackPress={() => navigation.goBack()}
        />
      )
    }
  }

  render() {
    return (
      <EditCustomerForm
        navigation={this.props.navigation}
        onPressSave={() => console.log('Save button pressed.')}
      />
    )
  }
}

export default NewCustomerScreen
