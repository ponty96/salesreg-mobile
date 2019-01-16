import React from 'react'
import SettingsList from '../../../Components/SettingsList'
import Header from '../../../Components/Header/BaseHeader'

interface IProps {
  navigation: any
  screenProps: any
}

export default class WebstoreOptionsScreen extends React.PureComponent<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Webstore Settings"
          leftIconTitle="md-arrow-back"
          leftIconType="Ionicons"
          onPressLeftIcon={() => navigation.goBack()}
        />
      )
    }
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
            section: 'Privacy Policy',
            routeName: 'UpsertPolicy',
            showRightCaret: true,
            description: 'Edit your business cover photo',
            icon: 'file-document',
            onPress: () => null,
            iconType: 'MaterialCommunityIcons'
          },
          {
            section: 'Refund Policy',
            routeName: 'UpsertPolicy',
            showRightCaret: true,
            description: 'Edit your business refund policy',
            icon: 'code-greater-than-or-equal',
            onPress: () => null,
            iconType: 'MaterialCommunityIcons'
          },
          {
            section: 'Delivery Policy',
            routeName: 'UpsertPolicy',
            showRightCaret: true,
            description: 'Edit your business delivery policy',
            icon: 'truck-delivery',
            onPress: () => null,
            iconType: 'MaterialCommunityIcons'
          },
          {
            section: 'Terms and Conditions',
            routeName: 'UpsertPolicy',
            showRightCaret: true,
            description: 'Edit your terms and conditions',
            icon: 'paperclip',
            onPress: () => null,
            iconType: 'MaterialCommunityIcons'
          }
        ]}
      />
    )
  }
}
