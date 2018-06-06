import React, { PureComponent } from 'react'
import { StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import NewProductForm from '../Components/NewProductForm'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

interface IState {}

class NewProductScreen extends PureComponent<IProps, IState> {
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
    return <NewProductForm navigation={this.props.navigation} />
  }
}

export default NewProductScreen

const styles = StyleSheet.create({
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  }
})
