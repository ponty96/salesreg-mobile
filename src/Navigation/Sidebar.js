import React from 'react'
import { ScrollView } from 'react-native'
import { DrawerItems, SafeAreaView} from 'react-navigation'
// import { Thumbnail } from 'native-base'

import styles from './../Style/Layout'

const SideBar = (props) => (
  <ScrollView>
    <SafeAreaView style={ styles.sidebarContainer } forceInset={{ top: 'always', horizontal: 'never' }}>
      {/* <ImageBackground style={ styles.drawerLogo } source={require('./../../images/background.jpg')}>
        <Thumbnail
          large
          source={require('./../../images/logo.jpg')}
        />
      </ImageBackground> */}
      <DrawerItems {...props}/>
    </SafeAreaView>
  </ScrollView>
)

export default SideBar