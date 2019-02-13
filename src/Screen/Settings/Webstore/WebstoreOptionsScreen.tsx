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
