import * as React from 'react'
import { View, Button, StyleSheet } from 'react-native'
import CustomHeader from '../Components/CustomHeader'

interface IProps {
  navigation: any
}

export default class SalesScreen extends React.Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Sales order"
          menu
          right
          firstRightIcon="ios-search"
          onPressFirstRightIcon={() => console.log('Search button pressed.')}
          rightText=" "
        />
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title={'Go to next screen'}
          onPress={() => this.props.navigation.navigate('ViewBusiness')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
