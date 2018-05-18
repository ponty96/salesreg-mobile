import React, { PureComponent } from 'react'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Icon } from 'native-base'

import styles from './../Style/Layout'
import ListItemAtom from './../Atom/ListItemAtom'
import { userData } from './../config/default'

interface IProps {
  navigation: any
}

interface Istate {}

class SideBar extends PureComponent<IProps, Istate> {
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
            <TouchableOpacity
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
            </TouchableOpacity>
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
