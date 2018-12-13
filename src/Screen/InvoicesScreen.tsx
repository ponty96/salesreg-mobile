import * as React from 'react'
import { View, Button, StyleSheet } from 'react-native'
import Header from '../Components/Header/DetailsScreenHeader'

interface IProps {
  navigation: any
}

export default class InvoicesScreen extends React.Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Invoice"
          rightIconType="MaterialCommunityIcons"
          rightIconTitle="credit-card-multiple"
          rightText="Pay"
          rightIconStyle={{
            transform: [{ rotate: '0deg' }]
          }}
          onPressLeftIcon={() => navigation.goBack()}
          onPressRightIcon={() => null}
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
