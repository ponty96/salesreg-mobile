import * as React from 'react'
import { View, StyleSheet, Alert, SectionList } from 'react-native'
import CustomHeader from '../Components/CustomHeader'
import FabAtom from '../Atom/FabAtom'

interface IProps {
  navigation: any
}

export default class ExpensesScreen extends React.Component<IProps> {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CustomHeader
          title="Expenses"
          showMenu
          onMenuPress={() => navigation.navigate('DrawerToggle')}
          showRight
          firstRightIcon="ios-search"
          onPressFirstRightIcon={() => Alert.alert('Search icon pressed.')}
        />
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FabAtom name="database-minus" type="MaterialCommunityIcons" />
        <SectionList sections={[]} />
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
