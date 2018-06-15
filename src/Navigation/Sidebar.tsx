import React, { PureComponent } from 'react'
import {
  ScrollView,
  View,
  Text,
  // TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import {Icon, List, ListItem } from 'native-base'

import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

class SideBar extends PureComponent<IProps> {
  handleNavigation = (location: string, data: any = undefined) => {
    this.props.navigation.navigate(location, { data })
  }

  render() {
    return (
      <SafeAreaView
        style={styles.sidebarContainer}
        forceInset={{ top: 'always', horizontal: 'never' }}
      >
        <View style={styles.sidebarName}>
          <Icon style={styles.nameIcon} name={'md-close'} />
          <Text style={styles.nameText}>BAYONE ATRACTIONS</Text>
        </View>
        <ScrollView style={styles.itemsContainer}>
          <List>
            <ListItem itemDivider style={styles.divider}>
            <Text style={styles.dividerText}>COMPANY</Text>
            </ListItem>
            <ListItem style={styles.item}>
                  <Text style={styles.itemText}>Home</Text>
            </ListItem>
            <ListItem style={styles.item}>
                <Text style={styles.itemText}>Products & Services</Text>
            </ListItem>
            <ListItem style={[styles.item, styles.bottomlessBorder]}>
                <Text style={styles.itemText}>Employees</Text>
            </ListItem>
            <ListItem itemDivider style={styles.divider}>
                <Text style={styles.dividerText}>CONTACT</Text>
            </ListItem>
            <ListItem style={styles.item}>
                <Text style={styles.itemText}>Customer</Text>
            </ListItem>
            <ListItem style={[styles.item, styles.bottomlessBorder]}>
                <Text style={styles.itemText}>Vendor</Text>
            </ListItem>
            <ListItem itemDivider style={styles.divider}>
                <Text style={styles.dividerText}>ORDER</Text>
            </ListItem>
            <ListItem style={styles.item}>
                <Text style={styles.itemText}>Purchase</Text>
            </ListItem>
            <ListItem style={[styles.item, styles.bottomlessBorder]}>
                <Text style={styles.itemText}>Sales</Text>
            </ListItem>
              <ListItem itemDivider style={styles.divider}>
                  <Text style={styles.dividerText}>TRANSACTIONS</Text>
              </ListItem>
              <ListItem style={styles.item}>
                  <Text style={styles.itemText}>Bank</Text>
              </ListItem>
              <ListItem style={styles.item}>
                  <Text style={styles.itemText}>Income</Text>
              </ListItem>
              <ListItem style={[styles.item, styles.bottomlessBorder]}>
                  <Text style={styles.itemText}>Expenses</Text>
              </ListItem>
          </List>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default SideBar

const styles = StyleSheet.create({
  sidebarItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16
  },
  sidebarContainer: {
    height: Dimensions.get('window').height - 16
  },
  divider: {
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: color.menu
  },
  item: {
    marginLeft: 0,
    paddingLeft: 18,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: color.label,
    backgroundColor: color.primary
  },
  itemText: {
    color: color.secondary
  },
  dividerText: {
    color: color.subHeader
  },
  itemsContainer: {
    flex: 4
  },
  nameIcon: {
    color: color.secondary
  },
  bottomlessBorder: {
    borderBottomWidth: 0
  },
  sidebarName: {
    padding: 16,
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    backgroundColor: color.primary
  },
  nameText: {
    color: color.secondary,
    flex: 1,
    marginLeft: 16
  }
})
