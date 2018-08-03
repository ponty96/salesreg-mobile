import React from 'react'
import { View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'

interface IProps {
  visible: boolean | false
}

export default class AppSpinner extends React.Component<IProps> {
  public render() {
    if (!this.props.visible) {
      return <View />
    } else {
      return (
        <Spinner
          visible={this.props.visible}
          overlayColor="#f6f8fa8f"
          color="#000"
        />
      )
    }
  }
}
