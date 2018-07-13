import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CustomHeader from '../Components/CustomHeader'

interface IProps {
  navigation: any
}

export default class SalesOrderScreen extends React.Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Sales order details"
          right
          firstRightIcon="pencil"
          firstRightIconType="MaterialCommunityIcons"
          onPressRightButton={() => console.log('Edit pressed.')}
          rightText="Edit"
          onBackPress={() => navigation.goBack()}
        />
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Sales order screen.</Text>
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
