import * as React from 'react'
import { View, Button, StyleSheet } from 'react-native'

interface IProps {
  navigation: any
}

export default class InventoryScreen extends React.Component<IProps> {
  static navigationOptions = () => {
    return {
      title: 'Inventory Screen'
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