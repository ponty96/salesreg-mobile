import React from 'react'
import { StyleSheet, ActivityIndicator, Platform } from 'react-native'
import { CachedImage } from 'react-native-cached-image'
import { color } from '../Style/Color'

interface IProps {
  uri: string
  style?: object
}

export default class CachedImageAtom extends React.PureComponent<IProps> {
  render() {
    return (
      <CachedImage
        source={{ uri: this.props.uri }}
        style={[styles.image, this.props.style]}
        loadingIndicator={
          <ActivityIndicator
            color={color.black}
            size={Platform.OS == 'android' ? 20 : 'small'}
          />
        }
      />
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100
  }
})
