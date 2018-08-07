import * as React from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import CustomHeader from '../Components/CustomHeader'
import FabAtom from '../Atom/FabAtom'

interface IProps {
  navigation: any
}

export default class ExpensesScreen extends React.Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Expenses"
          showMenu
          onPressFirstRightIcon={() => Alert.alert('Search button pressed.')}
        />
      )
    }
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <FabAtom
          routeName=""
          navigation={navigation}
          name="database-minus"
          type="MaterialCommunityIcons"
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
