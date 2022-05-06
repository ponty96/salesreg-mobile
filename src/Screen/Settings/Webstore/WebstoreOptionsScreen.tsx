import React from 'react'
import { Linking } from 'react-native'

import SettingsList from '../../../Components/SettingsList'
import Header from '../../../Components/Header/BaseHeader'
import { UserContext } from '../../../context/UserContext'

interface IProps {
  navigation: any
  screenProps: any
  user: any
}

class WebstoreOptionsScreen extends React.PureComponent<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Webstore Settings"
          leftIconTitle="md-arrow-back"
          leftIconType="Ionicons"
          onPressRightIcon={() => navigation.navigate('Notifications')}
          onPressLeftIcon={() => navigation.goBack()}
        />
      )
    }
  }

  openSite = () => {
    let {
      user: {
        company: { shareLink }
      }
    } = this.props
    Linking.canOpenURL(shareLink).then(supported => {
      if (supported) {
        Linking.openURL(shareLink).catch(() => null)
      }
    })
  }

  render() {
    let {
      navigation: { navigate }
    } = this.props
    return (
      <SettingsList
        navigate={navigate}
        categories={[
          {
            section: 'Cover Photo',
            routeName: 'UpsertCoverPhoto',
            showRightCaret: true,
            description: 'Edit your business cover photo',
            icon: 'wallpaper',
            iconType: 'MaterialIcons'
          },
          {
            section: 'Launch Your Webstore',
            onPress: this.openSite,
            showRightCaret: true,
            description: 'See what your webstore looks like',
            icon: 'rocket',
            iconType: 'MaterialCommunityIcons'
          }
          // {
          //   section: 'Manage Documents',
          //   routeName: 'Documents',
          //   showRightCaret: true,
          //   description: 'Edit your business documents',
          //   icon: 'file-document',
          //   iconType: 'MaterialCommunityIcons'
          // }
        ]}
      />
    )
  }
}

const _WebstoreOptionsScreen: any = props => (
  <UserContext.Consumer>
    {({ user }) => <WebstoreOptionsScreen {...props} user={user} />}
  </UserContext.Consumer>
)

_WebstoreOptionsScreen.navigationOptions =
  WebstoreOptionsScreen.navigationOptions

export default _WebstoreOptionsScreen
