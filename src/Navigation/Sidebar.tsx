import React, { PureComponent } from 'react'
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Icon } from 'native-base'

// import ListItemAtom from './../Atom/ListItemAtom'
// import { userData } from './../config/default'
import { color } from '../Style/Color'
import SidebarItem from '../Atom/SidebarItem'

interface IProps {
  navigation: any
}

export default class SideBar extends PureComponent<IProps> {
  handleNavigation = (location: string, data: any = undefined) => {
    this.props.navigation.navigate(location, { data })
  }

  render() {
    return (
      <SafeAreaView
        style={styles.sidebarContainer}
        forceInset={{ top: 'always', horizontal: 'never' }}
      >
        <View style={styles.itemsContainer}>
          <ScrollView>
            <TouchableOpacity style={styles.header}>
              <Icon name="cross" type="Entypo" style={styles.cross} />
              <Text style={styles.texts}>BAYONE ATTRACTIONS</Text>
            </TouchableOpacity>
            <SidebarItem
              title="COMPANY"
              categories={['Home', 'Products & Services', 'Employees']}
            />
            <SidebarItem title="CONTACT" categories={['Customer', 'Vendor']} />
            <SidebarItem title="ORDER" categories={['Purchase', 'Sales']} />
            <SidebarItem
              title="TRANSACTIONS"
              categories={[
                'Bank',
                'Income',
                'Expenses',
                'Invoices',
                'Receipts'
              ]}
            />
            <SidebarItem title="ACCOUNTING" categories={['Inventory']} />
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row'
  },
  texts: {
    color: color.modal,
    alignSelf: 'center'
  },
  itemText: {
    flex: 1,
    alignContent: 'center',
    paddingLeft: 12,
    color: color.menu
  },
  itemIcon: {
    color: color.menu
  },
  cross: {
    fontSize: 50,
    // backgroundColor: 'transparent',
    color: color.modal
  },
  logoutItem: {
    borderTopWidth: 1,
    borderColor: color.textBorderBottom,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16
  },
  sidebarItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 16
  },
  sidebarContainer: {
    height: Dimensions.get('window').height - 16,
    backgroundColor: color.primary
  },
  itemsContainer: {
    flex: 4
  }
})
