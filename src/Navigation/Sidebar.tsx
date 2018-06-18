import React, { PureComponent } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Icon } from 'native-base';
import { color } from '../Style/Color';
import SidebarItem from '../Atom/SidebarItem';

interface IProps {
  navigation: any;
}

export default class SideBar extends PureComponent<IProps> {
  handleNavigation = (location: string, data: any = undefined) => {
    this.props.navigation.navigate(location, { data });
  };

  render() {
    const {
      navigation: { navigate }
    } = this.props;
    console.log('navigation', this.props.navigation);
    return (
      <SafeAreaView
        style={styles.sidebarContainer}
        forceInset={{ top: 'always', horizontal: 'never' }}
      >
        <View style={styles.itemsContainer}>
          <ScrollView>
            <TouchableOpacity
              style={styles.header}
              onPress={() => navigate('DrawerClose')}
            >
              <Icon name="cross" type="Entypo" style={styles.cross} />
              <Text style={styles.texts}>BAYONE ATTRACTIONS</Text>
            </TouchableOpacity>
            <SidebarItem
              title="Company"
              navigate={navigate}
              categories={[
                {
                  title: 'Home',
                  routeName: 'Home'
                },
                {
                  title: 'Products & Services',
                  routeName: 'ViewBusiness'
                },
                {
                  title: 'Employees',
                  routeName: 'Employees'
                }
              ]}
            />

            <SidebarItem
              title="CONTACT"
              navigate={navigate}
              categories={[
                {
                  title: 'Customers',
                  routeName: 'CustomerDetails'
                },
                {
                  title: 'Vendors',
                  routeName: 'Vendor'
                }
              ]}
            />

            <SidebarItem
              title="ORDER"
              navigate={navigate}
              categories={[
                {
                  title: 'Purchase',
                  routeName: 'Purchase'
                },
                {
                  title: 'Sales',
                  routeName: 'Sales'
                }
              ]}
            />
            <SidebarItem
              title="TRANSACTIONS"
              navigate={navigate}
              categories={[
                {
                  title: 'Bank',
                  routeName: 'Bank'
                },
                {
                  title: 'Income',
                  routeName: 'Income'
                },
                {
                  title: 'Expenses',
                  routeName: 'Expenses'
                },
                {
                  title: 'Invoices',
                  routeName: 'Invoice'
                },
                {
                  title: 'Receipts',
                  routeName: 'Receipts'
                }
              ]}
            />

            <SidebarItem
              title="ACCOUNTING"
              navigate={navigate}
              categories={[
                {
                  title: 'Inventory',
                  routeName: 'Inventory'
                }
              ]}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginLeft: '3%',
    alignItems: 'center',
    paddingVertical: 16
  },
  texts: {
    color: color.modal,
    marginLeft: '3%',
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
    fontSize: 35,
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
});
