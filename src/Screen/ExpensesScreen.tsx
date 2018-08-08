import * as React from 'react'
import { View, StyleSheet, Alert, SectionList } from 'react-native'
import CustomHeader from '../Components/CustomHeader'
import FabAtom from '../Atom/FabAtom'
import EmptyList from '../Components/EmptyList'

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
          onMenuPress={() => navigation.navigate('DrawerToggle')}
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
        <SectionList
          sections={[]}
          ListEmptyComponent={
            <EmptyList type={{ Text: 'expenses', verifyMainList: 'main' }} />
          }
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
