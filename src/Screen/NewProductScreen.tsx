import React, { PureComponent } from 'react'
import NewProductForm from '../Components/NewProductForm'
import CustomHeader from '../Components/CustomHeader'

interface IProps {
  navigation: any
}

interface IState {}

class NewProductScreen extends PureComponent<IProps, IState> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader title="Product" onBackPress={() => navigation.goBack()} />
      )
    }
  }

  render() {
    return <NewProductForm navigation={this.props.navigation} />
  }
}

export default NewProductScreen
