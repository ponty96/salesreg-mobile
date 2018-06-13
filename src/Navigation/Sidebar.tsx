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
        <View style={styles.itemsContainer}>
          <ScrollView>
            <TouchableOpacity style={styles.header}>
              <Icon name="cross" type="Entypo" style={styles.cross} />
              <Text style={styles.texts}>BAYONE ATTRACTIONS</Text>
            </TouchableOpacity>
            <SidebarItem title="COMPANY" category="Home" />
            {/*<TouchableOpacity
              onPress={() =>
                this.handleNavigation('UserProfile', userData.profile)
              }
              activeOpacity={1}
            >
              <ListItemAtom
                item={userData.profile}
                business={false}
                bodyfunction={() =>
                  this.handleNavigation('UserProfile', userData.profile)
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handleNavigation('BusinessDetails')}
              activeOpacity={1}
            >
              <ListItemAtom
                item={{
                  name: 'kay5'
                }}
                bodyfunction={() => this.handleNavigation('BusinessDetails')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Settings')}
              activeOpacity={1}
            >
              <View style={styles.sidebarItem}>
                <Icon
                  name={'settings'}
                  style={styles.itemIcon}
                  type={'MaterialCommunityIcons'}
                />
                <Text style={styles.itemText}>Settings</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1}>
              <View style={styles.sidebarItem}>
                <Icon
                  name={'help'}
                  style={styles.itemIcon}
                  type={'MaterialCommunityIcons'}
                />
                <Text style={styles.itemText}>Need help</Text>
              </View>
            </TouchableOpacity>*/}
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.logoutItem}
          activeOpacity={1}
          onPress={() => this.handleNavigation('BusinessList')}
        >
          <Icon name={'md-briefcase'} style={styles.itemIcon} />
          <Text style={styles.itemText}>My businesses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutItem}
          activeOpacity={1}
          onPress={() => this.handleNavigation('Auth')}
        >
          <Icon
            name={'logout'}
            style={styles.itemIcon}
            type={'MaterialCommunityIcons'}
          />
          <Text style={styles.itemText}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

export default SideBar

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
    alignItems: 'center',
    padding: 16
  },
  sidebarContainer: {
    paddingHorizontal: 8,
    height: Dimensions.get('window').height - 16,
    backgroundColor: color.primary
  },
  itemsContainer: {
    flex: 4
  }
})
